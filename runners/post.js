export default function(postList, context) {
  const results = []
  for (const { description, check } of postList || []) {
    const passed = check(context)
    results.push({ description, passed })
  }
  return results
}