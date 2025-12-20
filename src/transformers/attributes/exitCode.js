import * as checks from '../checks.js'

export default (value) => ({
  post: [{
    description: 'exitCode check',
    check: ({ exitCode }) => checks.standard(exitCode, value)
  }]
})