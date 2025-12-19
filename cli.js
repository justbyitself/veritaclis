import * as veritaclis from './src/veritaclis.js'
import * as report from './src/report.js'

if (import.meta.main) {
  const [path] = Deno.args

  if (!path) {
    console.error('Please provide a test file or directory path.')
    Deno.exit(1)
  }

  const result = await veritaclis.run(path)
  report.viewer(result)

  Deno.exit(0)
}
