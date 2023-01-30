export function createSingleton<T>(name: string, create: () => T): T {
  const s = Symbol.for(name)
  let scope = (global as any)[s]
  if (!scope) {
    scope = { ...create() }
    ;(global as any)[s] = scope
  }
  return scope
}

export const getChannelName = (object: any, value: number) => {
  const channel = Object.keys(object).find((key) => object[key] === value)
  return channel ? channel[0].toUpperCase() + channel.slice(1).toLocaleLowerCase() : null
}

export const isEmpty = (obj: Record<string, unknown>) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

export const groupBy = <T>(listArr: T[], callback: (data: T) => string[]): T[][] => {
  const groups: Record<string, any> = {}
  listArr.forEach(function (data: any) {
    const group = JSON.stringify(callback(data))
    groups[group] = groups[group] || []
    groups[group].push(data)
  })

  return Object.keys(groups).map((key) => groups[key])
}
