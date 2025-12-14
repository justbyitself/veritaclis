export default {
  description: "Test to print environment variables using printenv",
  pre: [],
  run: () => ({
    command: "printenv",
    args: [],
    env: {
      TEST_VAR: "VeritaclisTest",
      ANOTHER_VAR: "12345"
    }
  }),
  post: [
    {
      description: "stdout should contain the defined environment variables",
      check: ({ stdout }) => {
        return stdout.includes("TEST_VAR=VeritaclisTest") && stdout.includes("ANOTHER_VAR=12345")
      }
    }
  ]
}
