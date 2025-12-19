import { merge, applyWith } from "./utils.js"
import * as transformers from "./transformers/attributes.js"

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

  return merge(canonical, applyWith(transformers, others))
}
