import { run as runCommand } from "./command.js"
import { dirname, join } from "jsr:@std/path"

async function runPreconditions(preList, context) {
  const results = []
  for (const { description, check } of preList || []) {
    const passed = await check()
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

async function runTest(testFile) {
  const result = {
    description: null,
    path: testFile,
    pre: [],
    post: [],
    error: null,
  }

  const context = {
    file: relativePath => Deno.readTextFileSync(join(Deno.cwd(), dirname(testFile), relativePath))
  }

  try {
    const mod = await import(`./${testFile}`)
    const testDef = mod.default

    result.description = testDef.description || null

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
  }
}

export async function run(path) {
  const results = []
  const info = await Deno.stat(path)

  if (info.isFile) {
    const result = await runTest(path)
    results.push(result)
  } else if (info.isDirectory) {
    for await (const entry of Deno.readDir(path)) {
      if (entry.isFile && entry.name.endsWith(".veritaclis.js")) {
        const result = await runTest(`${path}/${entry.name}`)
        results.push(result)
      }
    }
  } else {
    console.error("Path is neither file nor directory")
  }

  return results
}
