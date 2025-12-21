import { parse } from "jsr:@std/yaml@1.0.10"

export default (filePath) => {
  const bytes = Deno.readFileSync(filePath)
  const text = new TextDecoder().decode(bytes)
  return parse(text)
}
