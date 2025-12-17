import { merge } from "./utils.js"

function check(input, test) {
  if (test instanceof RegExp) {
    // If value is a RegExp, test stdout against the pattern
    return test.test(input)
  } else if (test === "function") {
    // If value is a function, use it as a predicate on stdout
    return test(input)
  } else {
    // Otherwise, use strict equality comparison
    return test === input
  }
}

const transformers = {
  stdout: value => ({
    post: [
      {
        description: 'stdout check',
        check: ({stdout}) => check(stdout, value)
      }
    ]
  }),
  stderr: value => ({
    post: [
      {
        description: 'stderr check',
        check: ({stderr}) => check(stderr, value)
      }
    ]
  }),
  exitCode: value => ({
    post: [
      {
        description: 'exitCode check',
        check: ({exitCode}) => check(exitCode, value)
      }
    ]
  }),
  success: value => ({
    post: [
      {
        description: 'exit successfully',
        check: ({success}) => check(success, value)
      }
    ]
  }),
  command: value => ({
    run: [() => ({command: value})]
  }),
  args: value => ({
    run: [() => ({args: value})]
  }),
  cwd: value => ({
    run: [() => ({cwd: value})]
  }),
  stdin: value => ({
    run: [() => ({stdin: value})]
  }),
  env: value => ({
    run: [() => ({env: value})]
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
    run = [],
    post = [],
    ...others
  } = input

  const canonical = { description, pre, run: [].concat(run), post }

  return merge(canonical, transform(others)) 
}
