import type { NamedObject } from '@/types/utility'

function mapQuery(query: Record<string, unknown>, target: any) {
  Object.keys(query).forEach(function (key) {
    let paramValues: unknown[]
    if (false === Array.isArray(query[key])) {
      paramValues = [query[key]]
    } else {
      paramValues = query[key] as unknown[]
    }
    paramValues
      .filter((value) => value !== undefined)
      .forEach((value) => {
        if (value && Object.prototype.hasOwnProperty.call(value, 'name')) {
          const namedObject = value as NamedObject
          // this is a fix for IE, which does not otherwise pick up the name of a file created on the fly using FilePonyFill
          target.append(key, value, namedObject.name)
        } else {
          target.append(key, value)
        }
      })
  })
  return target
}

export default {
  getUrlSearchParams: (params: Record<string, unknown>) => {
    const urlSearchParams = new URLSearchParams()
    return mapQuery(params, urlSearchParams) as URLSearchParams
  }
}
