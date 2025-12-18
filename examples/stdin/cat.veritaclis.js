// Tests passing input via stdin and validating that the command echoes it back.

export default {
  description: "Echo input via stdin",
  command: "cat",
  stdin: "Hello, stdin!\n",
  stdout: "Hello, stdin!\n",
  success: true
}
