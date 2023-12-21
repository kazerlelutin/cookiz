import { getLang } from "./get-lang"
import { translation } from "./translation"

/**
 * @description Translate the page
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
    const trans = translation?.[key]?.[lang] || key
    el.innerHTML = trans
  })

  placeholderToTranslate.forEach((el) => {
    const key = el.getAttribute("placeholder")
    const trans = translation?.[key]?.[lang] || key
    el.setAttribute("placeholder", trans)
  })
}
