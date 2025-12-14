export default {
  description: "Echo input via stdin",
  pre: [],
  run: () => ({
    command: "cat",
    args: [],
    stdin: "Hello, stdin!\n"
  }),
  post: [
    {
      description: "stdout should match stdin input",
      check: ({ stdout }) => stdout === "Hello, stdin!\n"
    }
  ]
}
