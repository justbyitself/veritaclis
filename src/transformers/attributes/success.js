import * as checks from '../checks.js'

export default (value) => ({
  post: [{
    description: 'exit successfully',
    check: ({ success }) => checks.standard(success, value)
  }]
})