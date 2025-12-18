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
