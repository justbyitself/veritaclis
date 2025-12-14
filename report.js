import { green, red, yellow, cyan, bold } from "https://deno.land/std/fmt/colors.ts"

export function viewer(results) {
  for (const testResult of results) {
    console.log(`\n${cyan(bold(`Test: ${testResult.path}`))}`);

    for (const pre of testResult.pre) {
      console.log(`  PRE: ${pre.description} ... ${pre.passed ? green("OK") : red("FAIL")}`);
    }

    if (testResult.pre.some(p => !p.passed)) {
      console.log(yellow("  Test skipped due to failed precondition(s)."));
      continue;
    }

    for (const post of testResult.post) {
      console.log(`  POST: ${post.description} ... ${post.passed ? green("OK") : red("FAIL")}`);
    }

    if (testResult.error) {
      console.log(red(`  ERROR: ${testResult.error}`));
    }
  }

  const total = results.length;
  const passed = results.filter(r => r.pre.every(p => p.passed) && r.post.every(p => p.passed) && !r.error).length;
  console.log(`\n${bold(`Summary: ${passed} / ${total} tests passed.`)}`);
}
