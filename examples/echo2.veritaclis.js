export default {
  pre: [],
  run: () => ({
    command: 'echo',
    args: ['-n', 'hello']
  }),
  post: [
    {
      description: 'stdout check',
      check: ({stdout}) => stdout === 'hello'
    },
    {
      description: 'exit successfully',
      check: ({exitCode}) => exitCode === 0
    }
  ]
}