import { extname, basename } from "jsr:@std/path@1.1.2"

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

export async function applyWith(handlers, entries, mergeFn = merge) {
  const results = await Promise.all(
    Object.entries(entries)
      .filter(([key]) => typeof handlers[key] === 'function')
      .map(([key, value]) => handlers[key](value))
  )

  const filteredResults = results.filter(result => result !== undefined)

  return filteredResults.reduce((acc, result) => mergeFn(acc, result), {})
}

export const map = (list, f) => list.map(f)

const ext = path => extname(path).slice(1).toLowerCase()

export const sort = list => Array.from(list).sort((a, b) => a.localeCompare(b))

const removeExtension = path => basename(path, extname(path))

export const samePathWithoutExtension = (a, b) => removeExtension(a) === removeExtension(b)

export const groupByExtension = list => groupWith(samePathWithoutExtension, list)

export const groupWith = (fn, list) =>
  list.reduce((acc, current) => {
    if (acc.length === 0) return [[current]]
    const lastGroup = acc[acc.length - 1]
    return fn(lastGroup[lastGroup.length - 1], current)
      ? [...acc.slice(0, -1), [...lastGroup, current]]
      : [...acc, [current]]
  }, [])

const priorityMap = list => {
  const map = new Map()
  list.forEach((ext, i) => map.set(ext.toLowerCase(), i))
  return map
}

export function sortByExtensions(files, extensions) {
  const priorities = priorityMap(extensions)

  const getPriority = e => priorities.has(e) 
    ? priorities.get(e) 
    : Number.POSITIVE_INFINITY

  return [...files].sort((a, b) => {
    const extA = ext(a)
    const extB = ext(b)
    const priorityA = getPriority(extA)
    const priorityB = getPriority(extB)

    if (priorityA !== priorityB) return priorityA - priorityB                     
    if (extA !== extB) return extA.localeCompare(extB)       
    return a.localeCompare(b)
  })
}

export function pipe(...fns) {
  return (input) => {
    let result = input
    for (const fn of fns) {
      result = fn(result)
    }
    return result
  }
}