import * as command from "./command.js"

async function runTest(testFile) {
  try {
    const mod = await import(`./${testFile}`)
    const testDef = mod.default

    if (Array.isArray(testDef.pre)) {
      for (const step of testDef.pre) {
        if (typeof step === "function") {
          await step()
        }
      }
    }

    const { command: cmdName, args } = typeof testDef.run === "function"
      ? testDef.run()
      : testDef.run

    const result = await command.run(cmdName, args)

    let allPassed = true
    for (const { description, check } of testDef.post || []) {
      const passed = check({
        stdout: result.stdout,
        exitCode: result.exitCode,
        success: result.success,
      })
      if (passed) {
        console.log(`${description}... OK`)
      } else {
        console.log(`${description}... FAIL`)
        allPassed = false
      }
    }

    return allPassed
  } catch (error) {
    console.error(`Error running test: ${error.message}`)
    return false
  }
}

if (import.meta.main) {
  const [testFile] = Deno.args
  if (!testFile) {
    console.error("Usage: deno run --allow-run --allow-read runner.js <testfile>")
    Deno.exit(1)
  }

  const success = await runTest(testFile)
  Deno.exit(success ? 0 : 1)
}
