// Illustrates the use of a pre-condition check to gate test execution
// based on environment variable presence.
// If the pre-condition fails, the test will not proceed.

export default {
  pre: {
      description: 'Check environment variable MY_ENV_VAR is set',
      check: () => !!Deno.env.get('MY_ENV_VAR')
  },
  command: 'echo',
  args: ['hello'],
  stdout: 'hello\n',
  success: true
}
