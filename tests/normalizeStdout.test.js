import { assert, assertEquals } from "asserts"
import { normalize } from "../src/normalizer.js"

Deno.test("normalize transforms stdout into post check", () => {
  const input = {
    run: () => ({
      command: 'echo',
      args: ['hello']
    }),
    stdout: 'hello\n'
  }

  const actual = normalize(input)
  
  // Check simple properties
  assertEquals(actual.description, undefined, "description should be undefined")
  assertEquals(Array.isArray(actual.pre), true, "pre should be an array")
  assertEquals(actual.pre.length, 0, "pre should be empty")

  // Check run
  assert(Array.isArray(actual.run), "run should be an array")
  assert(actual.run.length > 0, "run should not be empty")

  //assertEquals(actual.run(), input.run(), "run() should return the same result as input.run()")

  // Check post
  assert(Array.isArray(actual.post), "post should be an array")
  assert(actual.post.length > 0, "post should not be empty")

  // Check the description of the first post
  assertEquals(actual.post[0].description, "stdout check", "post[0] should have description 'stdout check'")

  // Check the check function of the first post
  const checkFn = actual.post[0].check
  assert(typeof checkFn === "function", "post[0].check should be a function")
  assert(checkFn({ stdout: 'hello\n' }), "check should pass with correct stdout")
  assert(!checkFn({ stdout: 'wrong\n' }), "check should fail with incorrect stdout")
})
