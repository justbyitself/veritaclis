import { run as runCommand } from "./command.js"
import { dirname, join } from "jsr:@std/path"
import { walk } from "jsr:@std/fs/walk"

async function runPreconditions(preList, context) {
  const results = []
  for (const { description, check } of preList || []) {
    const passed = await check(context)
    results.push({ description, passed })
    if (!passed) {
      break
    }
  }
  return results
}

function runPostconditions(postList, context) {
  const results = []
  for (const { description, check } of postList || []) {
    const passed = check(context)
    results.push({ description, passed })
  }
  return results
}

async function runTest(testPath) {
  const result = {
    description: null,
    path: testPath,
    pre: [],
    post: [],
    error: null,
  }

  const tempDir = Deno.makeTempDirSync()

  const path = relativePath => join(Deno.cwd(), dirname(testPath), relativePath)

  const context = {
    tempDir,
    path,
    file: relativePath => Deno.readTextFileSync(path(relativePath))
  }

  try {
    const mod = await import(`./${testPath}`)
    const testDef = mod.default

    result.description = testDef.description

    result.pre = await runPreconditions(testDef.pre, context)

    if (result.pre.some(p => !p.passed)) {
      return result
    }

    const commandResult = await runCommand(testDef.run(context))

    result.post = runPostconditions(testDef.post, {...context, ...commandResult})

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
    const result = await runTest(path)
    results.push(result)
  } else if (info.isDirectory) {
    for await (const entry of walk(path)) {
      if (entry.isFile && entry.name.endsWith(".veritaclis.js")) {
        const result = await runTest(entry.path)
        results.push(result)
      }
    }
  } else {
    console.error("Path is neither file nor directory")
  }

  return results
}
