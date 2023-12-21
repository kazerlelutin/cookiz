export function getCookie(name) {
  const cookies = document.cookie.split(";")
  const cookie = cookies.find((c) => c.includes(name))
  if (!cookie) return null
  return cookie.split("=")[1]
}

export function setCookie(name, value) {
  document.cookie = `${name}=${value}`
}

export function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}
