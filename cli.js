#!/usr/bin/env -S deno run --allow-all

import * as veritaclis from './src/veritaclis.js'
import * as report from './src/report/index.js'

// Exit code constants
const EXIT_SUCCESS = 0       // All tests passed
const EXIT_TEST_FAILURE = 1  // One or more tests failed
const EXIT_ERROR = 2         // Internal error or incorrect usage

if (import.meta.main) {
  const [path] = Deno.args

  if (!path) {
    console.error('Please provide a test file or directory path.')
    Deno.exit(EXIT_ERROR)
  }

  try {
    const simpleReport = await veritaclis.run(path)

    const analyzedReport = report.analyze(simpleReport)

    report.view(analyzedReport)

    Deno.exit(analyzedReport.allPassed ? EXIT_SUCCESS : EXIT_TEST_FAILURE)
  } catch (error) {
    console.error('Error:', error.message)
    Deno.exit(EXIT_ERROR)
  }
}
