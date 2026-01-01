import * as runners from "./runners/index.js"
import { normalize } from "./normalizer.js"
import { loader } from "./loader.js"
import { pipe, map, sort, groupByExtension } from "./utils.js"

import { dirname, join, resolve } from "jsr:@std/path@1.1.2"
import { walkSync } from "jsr:@std/fs@1.0.19/walk"

function evaluate(funcs, input) {
  return funcs.reduce((acc, fn) => {
    const result = fn(input)
    return { ...acc, ...result }
  }, {})
}

function createContext({absolutePath,  tempDir}) {
  const path = relativePath => join(absolutePath, relativePath)

  return {
    tempDir,
    path,
    file: relativePath => Deno.readTextFileSync(path(relativePath))
  }
}

async function processFiles(files) {
  const loaded = await loader(files)
  return await runTest(await normalize(loaded), files)
}

export async function run(path) {
  const info = await Deno.stat(path).catch(() => {
    throw new Error(`Path does not exist or is inaccessible: ${path}`)
  })

  if (!info.isFile && !info.isDirectory) {
    throw new Error(`Path is neither a file nor a directory: ${path}`)
  }

  const group = pipe(
    path => walkSync(path, { includeDirs: false, match: [/veritaclis\.[^.]+$/]}),
    entries => Array.from(entries),
    entries => map(entries, e => e.path),
    sort,
    groupByExtension
  )
  const absolutePath = resolve(path)

  const fileGroups = info.isFile ? [[absolutePath]] : group(absolutePath)

  const results = await Promise.all(
    fileGroups.map(files => processFiles(files))
  )

  return results
}

async function runTest(testDef, files) {
  const path = resolve(dirname(files[0]))

  const report = {
    description: null,
    path,
    pre: [],
    post: [],
    error: null,
  }

  const tempDir = Deno.makeTempDirSync()
  const context = createContext({absolutePath: path,  tempDir})

  try {
    report.description = testDef.description

    report.pre = runners.pre(testDef.pre, context)
    if (report.pre.some(p => !p.passed)) {
      return report
    }

    const commandResult = await runners.command(evaluate(testDef.run, context))

    report.post = runners.post(testDef.post, {...context, ...commandResult})
  } catch (error) {
    report.error = error.message || String(error)
  } finally {
    Deno.removeSync(tempDir, { recursive: true })
  }
  
  return report
}
