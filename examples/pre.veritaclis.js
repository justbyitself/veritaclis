export default {
  pre: [
    {
      description: 'Check environment variable MY_ENV_VAR is set',
      check: () => !!Deno.env.get('MY_ENV_VAR')
    }
  ],
  run: () => ({
    command: 'echo',
    args: ['hello']
  }),
  post: [
    {
      description: 'stdout check',
      check: ({stdout}) => stdout === 'hello\n'
    },
    {
      description: 'exit successfully',
      check: ({exitCode}) => exitCode === 0
    }
  ]
}
