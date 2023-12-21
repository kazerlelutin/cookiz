export function getTextFromBase64(base64) {
  return window.atob(base64)
}

export function getBase64FromText(text) {
  return window.btoa(text)
}
