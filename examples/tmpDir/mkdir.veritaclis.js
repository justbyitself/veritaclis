// Demonstrates creating nested directories inside a temporary directory.
// Uses a post-condition to compare the created directory structure with an expected one.
// Also highlights Veritaclis's ability to import and use npm packages (here, 'dir-compare')
// to perform complex checks within tests.

import { compareSync } from "npm:dir-compare"

export default {
  description: "Test mkdir -p creates nested directories matching expected structure",
  run: ({ tempDir }) => ({
      command: "mkdir",
      args: ["-p", "a/b/c"],
      cwd: tempDir
    }),
  post: [{
    description: 'Compare directories',
    check: ({ tempDir, path }) => compareSync(tempDir, path('expectedDir')).same
  }]
}
