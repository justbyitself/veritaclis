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
