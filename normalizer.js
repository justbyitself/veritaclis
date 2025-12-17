import { merge } from "./utils.js"

const transformers = {
  stdout: value => ({
    post: [
      {
        description: 'stdout check',
        check: ({stdout}) => stdout === value
      }
    ]
  }),
  stderr: value => ({
    post: [
      {
        description: 'stderr check',
        check: ({stderr}) => stderr === value
      }
    ]
  }),
  exitCode: value => ({
    post: [
      {
        description: 'exitCode check',
        check: ({exitCode}) => exitCode === value
      }
    ]
  }),
  success: value => ({
    post: [
      {
        description: 'success check',
        check: ({success}) => success === value
      }
    ]
  }),
}

function transform(others) {
  return Object.entries(others).reduce((acc, [key, value]) => {
    if (key in transformers) {
      const result = transformers[key](value)
      return merge(acc, result)
    }
    return acc
  }, {})
}

export function normalize(input) {
  const {
    description,
    pre = [],
    run,
    post = [],
    ...others
  } = input

  const canonical = { description, pre, run, post }

  return merge(canonical, transform(others)) 
}
