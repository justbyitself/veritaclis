import { split } from "npm:shellwords"

export default (value) => {
  const [command, ...args] = split(value)
  return {
    run: [() => ({ command, args })]
  }
}