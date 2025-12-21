import { green, gray, red, yellow, cyan, bold } from "jsr:@std/fmt@1/colors"

export function view(report) {
  for (const testResult of report.results) {
    console.log(cyan(bold(testResult.path)))

    if (testResult.description) {
      console.log(gray(testResult.description))
    }

    for (const pre of testResult.pre) {
      console.log(`  PRE: ${pre.description} ... ${pre.passed ? green("OK") : red("FAIL")}`)
    }

    if (testResult.skipped) {
      console.log(yellow("  Test skipped due to failed precondition(s)."))
      console.log()
      continue
    }

    for (const post of testResult.post) {
      console.log(`  POST: ${post.description} ... ${post.passed ? green("OK") : red("FAIL")}`)
    }

    if (testResult.error) {
      console.log(red(`  ERROR: ${testResult.error}`))
    }

    console.log()
  }

  const summaryText = `Summary: ${report.passedTests} / ${report.totalTests} tests passed.`
  const color = report.allPassed ? green : red
  console.log(color(bold(summaryText)))
}
