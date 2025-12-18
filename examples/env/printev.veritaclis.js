// Demonstrates setting environment variables for a command and verifying
// their presence in the output using a custom stdout check.

export default {
  description: "Test to print environment variables using printenv",
  command: "printenv",
  env: {
    FOO_VAR: "Veritaclis",
    BAR_VAR: "Veritaclis"
  },
  stdout: out => out.includes("FOO_VAR=Veritaclis") && out.includes("BAR_VAR=Veritaclis"),
  success: true
}
