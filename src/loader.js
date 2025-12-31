import { load } from "jsr:@justbyitself/modulia"
import { sortByExtensions } from "./utils.js"

export async function loader(files) {
  const sortedFiles = sortByExtensions(files, ['yaml', 'yml', 'js'])

  const modules = await Promise.all(sortedFiles.map(file => load(file)))

  return modules.reduce((acc, module) => ({ ...acc, ...module() }), {})
}
