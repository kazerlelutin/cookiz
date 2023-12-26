import { getStore } from "../utils/save.utils"
export function cookizeCmd(_parser, runtime, tokens) {
  if (!tokens.matchToken("cookize")) return null
  return {
    async op(ctx) {
      const el = ctx.me
      const store = getStore()
      const count = store.c

      if (count === 0) return runtime.findNext(this)
      el.classList.add("text-2xl")
      if (el.classList.contains("text-[6rem]")) {
        el.classList.remove("text-[6rem]")
        el.classList.add("text-[2rem]")
      }
      if (el.classList.contains("leading-[5.5rem]")) {
        el.classList.remove("leading-[5.5rem]")
        el.classList.add("leading-[2rem]")
      }

      el.innerText = count
        .toString()
        .padStart(2, "0")
        // add space every 3 digits
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
      return runtime.findNext(this)
    },
  }
}
