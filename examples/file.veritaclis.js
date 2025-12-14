export default {
  description: "Test using input and expected output files with file helper",
  run: ({ file }) => ({
    command: "cat",
    args: ["-n"],
    stdin: file("./input.txt")
  }),
  post: [
    {
      description: "stdout should match the expected output",
      check: ({ stdout, file }) => stdout === file("./expected.txt")
    }
  ]
}
