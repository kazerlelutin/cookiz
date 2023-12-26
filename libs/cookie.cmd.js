import { getStore } from "../utils/save.utils"

export function cookieCmd(_parser, runtime, tokens) {
  if (!tokens.matchToken("cookie")) return null

  return {
    async op(ctx) {
      const el = ctx.me

      const store = getStore()
      el.style.transition = "transform .1s ease-in-out"
      el.style.transform = "scale(.9)"
      const audioEl = document.querySelector("#coin-audio")
      audioEl.currentTime = 0
      audioEl.volume = 0.5
      audioEl.play()
      setTimeout(() => {
        el.style.transform = "scale(1)"
      }, 50)

      const cm = store.cm === 0 ? 1 : store.cm
      store.c += 1 * cm
      return runtime.findNext(this)
    },
  }
}
