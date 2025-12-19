import { merge } from "./utils.js"
import * as transformers from "./transformers/attributes.js"

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

  const canonical = { 
    description, 
    pre: [].concat(pre), 
    run: [].concat(run), 
    post: [].concat(post) 
  }

  return merge(canonical, transform(others)) 
}
