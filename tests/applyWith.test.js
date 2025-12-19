import { assertEquals, assert } from "asserts"
import { applyWith } from "../src/utils.js"

const transformers = {
  double: v => ({ val: v * 2 }),
  increment: v => ({ val: v + 1 }),
  toUpper: v => ({ val: v.toUpperCase() }),
}

Deno.test("applyWith applies all matching handlers", () => {
  const input = { double: 3, increment: 4 }
  const expected = { val: 5 } // merge will overwrite val, so last wins

  const result = applyWith(transformers, input)
  // Because merge overwrites, val will be from last applied handler (increment)
  assertEquals(result.val, 5)
})

Deno.test("applyWith ignores keys without handlers", () => {
  const input = { unknown: 10 }
  const result = applyWith(transformers, input)
  assertEquals(result, {})
})

Deno.test("applyWith merges results correctly", () => {
  const customMerge = (a, b) => {
    return { ...a, ...b, merged: true }
  }
  const input = { double: 2, toUpper: "hello" }
  const result = applyWith(transformers, input, customMerge)
  assert(result.merged, "custom merge should add merged flag")
  assertEquals(result.val, "HELLO") // last applied handler result
})
