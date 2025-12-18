export default {
  description: "Test using input and expected output files with file helper",
  run: ({ file }) => ({
    command: "cat",
    args: ["-n"],
    stdin: file("./input.txt")
  }),
  post: {
    description: "stdout should match expected.txt file content",
    check: ({ stdout, file }) => stdout === file("./expected.txt")
  }
}