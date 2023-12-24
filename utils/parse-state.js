export function parseState(value) {
  if (value.startsWith("[") || value.startsWith("{")) return JSON.parse(value)

  return value
}

export function setState(el, key, value) {
  const valueType = typeof value
  el.setAttribute(
    "data-state-" + key,
    valueType.match(/string|number|bool/) ? value : JSON.stringify(value)
  )

  return el
}
