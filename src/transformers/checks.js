export function standard(input, test) {
  if (test instanceof RegExp) {
    // If value is a RegExp, test stdout against the pattern
    return test.test(input)
  } else if (typeof test === "function") {
    // If value is a function, use it as a predicate on stdout
    return test(input)
  } else {
    // Otherwise, use strict equality comparison
    return test === input
  }
}