function isObject(obj) {
  return obj && typeof obj === 'object' && !Array.isArray(obj)
}

export function merge(target, source) {
  const output = { ...target }

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (Array.isArray(source[key]) && Array.isArray(target[key])) {
        output[key] = [...target[key], ...source[key]]
      } else if (isObject(source[key]) && isObject(target[key])) {
        output[key] = merge(target[key], source[key])
      } else {
        output[key] = source[key]
      }
    }
  }

  return output
}

export function applyWith(handlers, entries, mergeFn = merge) {
  return Object.entries(entries)
    .filter(([key]) => typeof handlers[key] === 'function')
    .map(([key, value]) => handlers[key](value))
    .filter(result => result !== undefined)
    .reduce((acc, result) => mergeFn(acc, result), {})
}
