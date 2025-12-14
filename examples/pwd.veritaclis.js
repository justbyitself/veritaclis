export default {
  description: "Run pwd in /tmp directory",
  pre: [],
  run: () => ({
    command: "pwd",
    args: [],
    cwd: "/tmp"
  }),
  post: [
    {
      description: "stdout should be /tmp",
      check: ({ stdout }) => stdout.trim() === "/tmp"
    }
  ]
}
