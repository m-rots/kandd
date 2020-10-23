export type Range = {
  min: number,
  max: number,
}

export type StdRangeFilter = RangeFilter<Range> | RangeFilter<number>

export type RangeFilter<T> = {
  enabled: boolean,
  value: T
}

export function isRange(filter: StdRangeFilter): filter is RangeFilter<Range> {
  return typeof filter.value !== "number";
}

export function isNumber(filter: StdRangeFilter): filter is RangeFilter<number> {
  return typeof filter.value === "number";
}