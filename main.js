import * as command from "./command.js"
import * as report from './report.js'

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

    // Evaluar precondiciones sin if, con fallback a array vacío
    for (const { description, check } of testDef.pre || []) {
      const passed = await check()
      result.pre.push({ description, passed })
      if (!passed) {
        return result
      }
    }

    // Ejecutar comando
    const { command: cmdName, args } = testDef.run()
    const commandResult = await command.run(cmdName, args)

    // Evaluar postcondiciones sin if, con fallback a array vacío
    for (const { description, check } of testDef.post || []) {
      const passed = check({
        stdout: commandResult.stdout,
        exitCode: commandResult.exitCode,
        success: commandResult.success,
      })
      result.post.push({ description, passed })
    }

    return result

  } catch (error) {
    result.error = error.message || String(error)
    return result
  }
}

async function runTests(path) {
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


if (import.meta.main) {
  const [testFile] = Deno.args
  if (!testFile) {
    console.error('Please provide a test file or directory path.')
    Deno.exit(1)
  }

  const result = await runTests(testFile)
  report.viewer(result)
  Deno.exit(0)
}
