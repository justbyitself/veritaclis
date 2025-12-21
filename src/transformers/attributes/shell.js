import { split } from "npm:shellwords@1.1.1"

export default (value) => {
  const [command, ...args] = split(value)
  return {
    run: [() => ({ command, args })]
  }
}