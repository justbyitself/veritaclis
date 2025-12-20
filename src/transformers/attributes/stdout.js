import * as checks from '../checks.js'

export default (value) => ({
  post: [{
    description: 'stdout check',
    check: ({ stdout }) => checks.standard(stdout, value)
  }]
})