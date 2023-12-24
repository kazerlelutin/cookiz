import { getLang } from "./get-lang"
import { translation } from "./translation"

/**
 * @description Translate the page or specific elements. If 'data-trans-count' is provided and greater than 1,
 *              the translation key with suffix '_multi' will be used for plural forms, and '{{count}}' in the translation
 *              will be replaced with the actual count.
 * @param {Element|null} elementToTranslate - The element to translate or null to translate the whole document.
 * @returns {void}
 */
export function translate(elementToTranslate) {
  const lang = getLang()

  const elToTranslate = elementToTranslate
    ? elementToTranslate.querySelectorAll("[data-trans]")
    : document.querySelectorAll("[data-trans]")
  const placeholderToTranslate = elementToTranslate
    ? elementToTranslate.querySelectorAll("[placeholder]")
    : document.querySelectorAll("[placeholder]")
  elToTranslate.forEach((el) => {
    const key = el.getAttribute("data-trans")
    const count = el.getAttribute("data-trans-count")
    const finalKey = count > 1 ? `${key}_multi` : key
    let trans = translation?.[finalKey]?.[lang] || key
    if (count) trans = trans.replace("{{count}}", count)
    el.innerHTML = trans
  })

  placeholderToTranslate.forEach((el) => {
    const key = el.getAttribute("placeholder")
    const trans = translation?.[key]?.[lang] || key
    el.setAttribute("placeholder", trans)
  })
}

export function translateStr(text, count = 0) {
  const lang = getLang()
  const finalKey = count > 1 ? `${text}_multi` : text

  return translation?.[finalKey]?.[lang] || text
}
