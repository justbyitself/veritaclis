export default {
  description: "Test to print environment variables using printenv",
  command: "printenv",
  env: {
    TEST_VAR: "Veritaclis",
    ANOTHER_VAR: "12345"
  },
  stdout: out => out.includes("TEST_VAR=Veritaclis") && out.includes("ANOTHER_VAR=12345"),
  success: true
}
