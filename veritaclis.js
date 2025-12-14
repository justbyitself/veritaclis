import * as command from "./command.js"

async function runPreconditions(preList) {
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

function runPostconditions(postList, commandResult) {
  const results = []
  for (const { description, check } of postList || []) {
    const passed = check({
      stdout: commandResult.stdout,
      exitCode: commandResult.exitCode,
      success: commandResult.success,
    })
    results.push({ description, passed })
  }
  return results
}

async function runTest(testFile) {
  const result = {
    path: testFile,
    pre: [],
    post: [],
    error: null,
  }

  try {
    const mod = await import(`./${testFile}`)
    const testDef = mod.default

    result.pre = await runPreconditions(testDef.pre)

    if (result.pre.some(p => !p.passed)) {
      return result
    }

    const { command: cmdName, args } = testDef.run()
    const commandResult = await command.run(cmdName, args)

    result.post = runPostconditions(testDef.post, commandResult)

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
