import * as command from "./command.js"

async function runTest(testFile) {
  try {
    const mod = await import(`./${testFile}`)
    const testDef = mod.default

    const { command: cmdName, args } = testDef.run()

    const result = await command.run(cmdName, args)

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
      }
    }

  } catch (error) {
    console.error(`Error running test: ${error.message}`)
  }
}

if (import.meta.main) {
  const [testFile] = Deno.args
  if (!testFile) {
    console.error("Usage: deno run --allow-run --allow-read runner.js <testfile>")
    Deno.exit(1)
  }

  await runTest(testFile)
  Deno.exit(0)
}
