import { load } from "jsr:@justbyitself/modulia"

export async function loader(files) {
  const modules = await Promise.all(files.map(file => load(file)))

  return modules.reduce((acc, module) => ({ ...acc, ...module() }), {})
}
