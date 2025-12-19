import * as runners from "./runners/index.js"
import { normalize } from "./normalizer.js"

import { dirname, join, resolve, relative } from "jsr:@std/path"
import { walk } from "jsr:@std/fs/walk"

function evaluate(funcs, input) {
  return funcs.reduce((acc, fn) => {
    const result = fn(input)
    return { ...acc, ...result }
  }, {})
}

function createContext({absolutePath,  tempDir}) {
  const path = relativePath => join(dirname(absolutePath), relativePath)

  return {
    tempDir,
    path,
    file: relativePath => Deno.readTextFileSync(path(relativePath))
  }
}

async function runTest(absolutePath) {
  const result = {
    description: null,
    path: relative(Deno.cwd(), absolutePath),
    pre: [],
    post: [],
    error: null,
  }

  const tempDir = Deno.makeTempDirSync()

  const context = createContext({absolutePath,  tempDir})

  try {
    const mod = await import(absolutePath)
    const testDef = normalize(mod.default)

    result.description = testDef.description

    result.pre = runners.pre(testDef.pre, context)

    if (result.pre.some(p => !p.passed)) {
      return result
    }

    const commandResult = await runners.command(evaluate(testDef.run, context))

    result.post = runners.post(testDef.post, {...context, ...commandResult})

    return result

  } catch (error) {
    result.error = error.message || String(error)
    return result
  } finally {
    Deno.removeSync(tempDir, { recursive: true })
  }
}

export async function run(path) {
  const results = []
  const info = await Deno.stat(path)

  if (info.isFile) {
    const result = await runTest(resolve(path))
    results.push(result)
  } else if (info.isDirectory) {
    for await (const entry of walk(path, { exts: ["veritaclis.js"], includeDirs: false })) {
      const result = await runTest(resolve(entry.path))
      results.push(result)
    }
  } else {
    console.error("Path is neither file nor directory")
  }

  return results
}
