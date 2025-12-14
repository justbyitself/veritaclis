import * as veritaclis from './veritaclis.js'
import * as report from './report.js'

if (import.meta.main) {
  const [testFile] = Deno.args
  if (!testFile) {
    console.error('Please provide a test file or directory path.')
    Deno.exit(1)
  }

  const result = await veritaclis.run(testFile)
  report.viewer(result)
  Deno.exit(0)
}
