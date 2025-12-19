import * as checks from './checks.js'

export const stdout = (value) => ({
  post: [{
    description: 'stdout check',
    check: ({ stdout }) => checks.standard(stdout, value)
  }]
})

export const stderr = (value) => ({
  post: [{
    description: 'stderr check',
    check: ({ stderr }) => checks.standard(stderr, value)
  }]
})

export const exitCode = (value) => ({
  post: [{
    description: 'exitCode check',
    check: ({ exitCode }) => checks.standard(exitCode, value)
  }]
})

export const success = (value) => ({
  post: [{
    description: 'exit successfully',
    check: ({ success }) => checks.standard(success, value)
  }]
})

export const command = (value) => ({
  run: [() => ({ command: value })]
})

export const args = (value) => ({
  run: [() => ({ args: value })]
})

export const cwd = (value) => ({
  run: [() => ({ cwd: value })]
})

export const stdin = (value) => ({
  run: [() => ({ stdin: value })]
})

export const env = (value) => ({
  run: [() => ({ env: value })]
})
