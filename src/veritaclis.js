import * as runners from "./runners/index.js"
import { normalize } from "./normalizer.js"
import { loader } from "./loader.js"
import { pipe, collectEntries, sortEntriesAlphabetically, groupAndSortByExtensions } from "./utils.js"

import { dirname, join, resolve } from "jsr:@std/path"

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

  const exts = ["veritaclis.yaml", "veritaclis.js"]

  const toGroupedPaths = pipe(
    path => collectEntries(path, exts),
    sortEntriesAlphabetically,
    entries => groupAndSortByExtensions(entries, exts)
  )

  const fileGroups = info.isFile ? [[resolve(path)]] : toGroupedPaths(path)

  const results = await Promise.all(
    fileGroups.map(files => processFiles(files))
  )

  return results
}

async function runTest(testDef, files) {
  const path = resolve(dirname(files[0]))

  const result = {
    description: null,
    path,
    pre: [],
    post: [],
    error: null,
  }

  const tempDir = Deno.makeTempDirSync()
  const context = createContext({path,  tempDir})

  try {
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
