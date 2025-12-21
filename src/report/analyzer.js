export function analyze(simpleReport) {
  const results = []
  let totalTests = 0
  let passedTests = 0
  let skippedTests = 0
  let failedTests = 0
  let errorsCount = 0

  for (const test of simpleReport) {
    totalTests += 1

    const hasFailedPre = Array.isArray(test.pre)
      ? test.pre.some(p => !p.passed)
      : false

    const hasFailedPost = Array.isArray(test.post)
      ? test.post.some(p => !p.passed)
      : false

    const hasError = Boolean(test.error)

    const skipped = hasFailedPre
    const passed = !hasError && !skipped && !hasFailedPost

    if (hasError) {
      errorsCount += 1
    }

    if (skipped) {
      skippedTests += 1
    } else if (passed) {
      passedTests += 1
    } else {
      failedTests += 1
    }

    results.push({
      ...test,
      passed,
      skipped,
    })
  }

  const allPassed =
    totalTests > 0 &&
    passedTests === totalTests &&
    errorsCount === 0

  return {
    results,
    totalTests,
    passedTests,
    skippedTests,
    failedTests,
    errorsCount,
    allPassed,
  }
}
