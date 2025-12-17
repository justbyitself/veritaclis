export default {
  run: () => ({
    command: 'echo',
    args: ['hello']
  }),
  stdout: /hello/,
  success: true
}