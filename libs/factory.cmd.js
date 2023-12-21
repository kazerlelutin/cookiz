import { getFactory, saveFactory } from "../utils/save.utils"
import { updateCounter } from "./cookie.cmd"
import { updateCookieMultiplier, updateMultiplier } from "./secret.cmd"

export function factoryCmd(_parser, runtime, tokens) {
  if (!tokens.matchToken("factory")) return null

  return {
    async op(ctx) {
      const el = ctx.me

      const factory = getFactory()

      const secretsEl = document.querySelectorAll("[_*='on click secret']")

      secretsEl.forEach((secretEl) => {
        const _hyp = secretEl.getAttribute("_")
        const _hypSplit = _hyp.replace(/[\s'`]/g, "").replace(/onclicksecret|end/g, "")

        const find = factory.s.includes(_hypSplit)
        if (!find) return

        secretEl.stateDisabled = true
        secretEl.style.opacity = 0.5
      })

      el.count = factory.c
      el.multiplier = factory.m
      el.clickMultiplier = factory.cm

      updateCookieMultiplier(el.clickMultiplier)
      updateMultiplier(el.multiplier)

      setInterval(() => {
        el.count = el.count + 1 * el.multiplier
        if (el.count === 0) return
      }, 1000)

      setInterval(() => {
        updateCounter(el.count)
      }, 100)

      setInterval(() => {
        if (el.count === 0) return
        document.title = `${el.count} cookies - COOKIZ`

        saveFactory({
          c: el.count,
          m: el.multiplier,
          cm: el.clickMultiplier,
        })
      }, 5000)

      return runtime.findNext(this)
    },
  }
}
