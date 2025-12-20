import { parse } from "jsr:@std/yaml"

export default (filePath) => {
  const bytes = Deno.readFileSync(filePath)
  const text = new TextDecoder().decode(bytes)
  return parse(text)
}
