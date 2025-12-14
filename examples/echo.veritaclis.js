export default {
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