import { importModule } from "jsr:@brad-jones/jsr-dynamic-imports@^0.1.2"

export default async (filePath) => (await importModule('file://' + filePath)).default