import * as command from "./command.js"

async function runTest(testFile) {
  try {
    const mod = await import(`./${testFile}`)
    const testDef = mod.default

    const { command: cmdName, args } = testDef.run()

    const result = await command.run(cmdName, args)

    console.log(`[${testFile}]`)

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
    
    console.log()

  } catch (error) {
    console.error(`Error running test: ${error.message}`)
  }
}

async function runTests(path) {
  const info = await Deno.stat(path);
  if (info.isFile) {
    await runTest(path)
  } else if (info.isDirectory) {
    for await (const entry of Deno.readDir(path)) {
      if (entry.isFile && entry.name.endsWith(".veritaclis.js")) {
        await runTest(`${path}/${entry.name}`)
      }
    }
  } else {
    console.error("Path is neither file nor directory")
  }
}

if (import.meta.main) {
  const [testFile] = Deno.args
  if (!testFile) {
    console.error('Please provide a test file or directory path.')
    Deno.exit(1)
  }

  await runTests(testFile)
  Deno.exit(0)
}
