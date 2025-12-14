export default {
  pre: [],
  run: () => ({
    command: "cp",
    args: []
  }),
  post: [
    {
      description: "stderr should contain usage information or error message",
      check: ({ stderr }) => stderr.length > 0
    },
    {
      description: "exit code should be non-zero",
      check: ({ exitCode }) => exitCode !== 0
    }
  ]
}
