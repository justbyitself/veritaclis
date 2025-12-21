import { dirname, resolve, extname } from "jsr:@std/path@1.1.2"
import { walk } from "jsr:@std/fs@1.0.19/walk"

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

export async function collectEntries(path, suffixes) {
  const entries = []
  for await (const entry of walk(path, { includeDirs: false })) {
    for (const suffix of suffixes) {
      if (entry.name.endsWith(suffix)) {
        entries.push(resolve(entry.path))
        break
      }
    }
  }
  return entries
}

export function sortEntriesAlphabetically(entries) {
  return entries.sort((a, b) => a.localeCompare(b))
}

export function groupAndSortByExtensions(entries, exts) {
  const groups = new Map()

  for (const filePath of entries) {
    const dir = dirname(filePath)
    if (!groups.has(dir)) {
      groups.set(dir, [])
    }
    groups.get(dir).push(filePath)
  }

  const groupedTuples = []
  for (const files of groups.values()) {
    files.sort((a, b) => {
      const extA = extname(a).slice(1)
      const extB = extname(b).slice(1)
      return exts.indexOf(extA) - exts.indexOf(extB)
    })

    for (let i = 0; i < files.length; i += exts.length) {
      groupedTuples.push(files.slice(i, i + exts.length))
    }
  }

  return groupedTuples
}

export function pipe(...fns) {
  return async (input) => {
    let result = input
    for (const fn of fns) {
      result = await fn(result)
    }
    return result
  }
}