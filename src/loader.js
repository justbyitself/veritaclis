import * as loaders from "./loaders/index.js"
import { applyWith } from "./utils.js"

export async function loader(files) {
  const input = Object.fromEntries(
    files.map(file => [file.split(".").pop(), file])
  )
  
  return await applyWith(loaders, input)
}
