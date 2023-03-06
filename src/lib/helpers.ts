const singletonMap = new Map<symbol, unknown>()

export function createSingleton<T>(name: string, create: () => T): T {
  const singletonSymbol = Symbol.for(name)

  if (singletonMap.has(singletonSymbol)) {
    return singletonMap.get(singletonSymbol) as T
  }

  const singleton = create()
  singletonMap.set(singletonSymbol, singleton)

  return singleton
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
