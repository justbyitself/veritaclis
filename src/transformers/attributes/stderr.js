import * as checks from '../checks.js'

export default (value) => ({
  post: [{
    description: 'stderr check',
    check: ({ stderr }) => checks.standard(stderr, value)
  }]
})