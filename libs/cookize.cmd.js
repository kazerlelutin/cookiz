import { getStore } from "../utils/save.utils"
export function cookizeCmd(parser, runtime, tokens) {
  if (!tokens.matchToken("getCookize")) return null
  const expr = parser.requireElement("expression", tokens)
  return {
    args: [expr],
    async op(ctx) {
      const el = ctx.me
      const store = getStore()
      const count = store.c

      if (count === 0) return runtime.findNext(this)
      el.innerText = count
        .toString()
        .padStart(2, "0")
        // add space every 3 digits
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")

      if (count < 100) return
      el.style.fontSize = "4rem"
      if (count < 1000) return
      el.style.fontSize = "3rem"
      if (count < 100000) return
      const cEl = document.querySelector("#c")
      if (cEl) cEl.remove()
      const kizEl = document.querySelector("#kiz")
      if (kizEl) kizEl.remove()
      if (count < 10000000) return
      el.style.fontSize = "2rem"
      return runtime.findNext(this)
    },
  }
}
