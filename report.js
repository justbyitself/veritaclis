export function viewer(results) {
  for (const testResult of results) {
    console.log(`\nTest: ${testResult.path}`)

    for (const pre of testResult.pre) {
      console.log(`  PRE: ${pre.description} ... ${pre.passed ? 'OK' : 'FAIL'}`)
    }

    if (testResult.pre.some(p => !p.passed)) {
      console.log('  Test skipped due to failed precondition(s).')
      continue
    }

    for (const post of testResult.post) {
      console.log(`  POST: ${post.description} ... ${post.passed ? 'OK' : 'FAIL'}`)
    }

    if (testResult.error) {
      console.log(`  ERROR: ${testResult.error}`)
    }
  }

  const total = results.length
  const passed = results.filter(r => r.pre.every(p => p.passed) && r.post.every(p => p.passed) && !r.error).length
  console.log(`\nSummary: ${passed} / ${total} tests passed.`)
}
