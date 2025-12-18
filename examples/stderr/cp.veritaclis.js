// Shows how to test for expected error output and failure status when
// a command is run incorrectly (no arguments).

export default {
  description: "cp with no arguments",
  command: "cp",
  stderr: err => err.length > 0,
  success: false
}
