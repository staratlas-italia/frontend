export function toTuple<Values extends [unknown, ...unknown[]]>(values: Values): Values
export function toTuple<Values extends [unknown]>(values: Values) {
  return values
}
