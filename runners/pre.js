export default function(preList, context) {
  const results = []
  for (const { description, check } of preList || []) {
    const passed = check(context)
    results.push({ description, passed })
    if (!passed) {
      break
    }
  }
  return results
}