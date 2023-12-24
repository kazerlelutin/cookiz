import { disabledShopItem } from "../utils/disabled-shop-item"
import { getFactory, saveFactory } from "../utils/save.utils"
import { updateCounter } from "./cookie.cmd"
import { updateCookieMultiplier, updateMultiplier } from "./secret.cmd"

export function factoryCmd(_parser, runtime, tokens) {
  if (!tokens.matchToken("factory")) return null

  return {
    async op(ctx) {
      const el = ctx.me
      if (!el.state) el.state = {}
      const factory = getFactory()

      const secretsEl = document.querySelectorAll("[_*='on click secret']")

      secretsEl.forEach((secretEl) => {
        const _hyp = secretEl.getAttribute("_")
        const _hypSplit = _hyp.replace(/[\s'`]/g, "").replace(/onclicksecret|end/g, "")

        const find = factory.s.includes(_hypSplit)

        if (!find) return
        if (!secretEl.state) secretEl.state = {}
        secretEl.state.disabled = true
        secretEl.style.opacity = 0.5
      })

      el.state.count = factory.c
      el.state.multiplier = factory.m
      el.state.clickMultiplier = factory.cm

      updateCookieMultiplier(factory.cm)
      updateMultiplier(el.state.multiplier)

      const updateCount = async () => {
        if (el.state.count === 0) return
        el.state.count = el.state.count + 1 * el.state.multiplier
      }

      const updateTitleAndSave = async () => {
        if (el.state.count === 0) return
        const isMillion = el.state.count >= 1000000
        const isBillion = el.state.count >= 1000000000
        const isTrillion = el.state.count >= 1000000000000
        const isQuadrillion = el.state.count >= 1000000000000000

        const text = `cookies - COOKIZE`
        if (isQuadrillion) {
          document.title = `${(el.state.count / 1000000000000000).toFixed(2)} quadrillion ${text}`
        } else if (isTrillion) {
          document.title = `${(el.state.count / 1000000000000).toFixed(2)} trillion ${text}`
        } else if (isBillion) {
          document.title = `${(el.state.count / 1000000000).toFixed(2)} billion ${text}`
        } else if (isMillion) {
          document.title = `${(el.state.count / 1000000).toFixed(2)} million ${text}`
        } else {
          document.title = `${el.state.count} ${text}`
        }

        saveFactory({
          c: el.state.count,
          cm: el.state.clickMultiplier,
          m: el.state.multiplier,
        })
      }

      let tick = 0
      const cron = setInterval(() => {
        // Update count every 10 ticks (1s)
        if (tick % 10 === 0) {
          updateCounter(el.state.count)
          updateCount()
          disabledShopItem()
        }

        // Update title every 50 ticks (5s)
        if (tick % 50 === 0) {
          updateTitleAndSave()
        }

        tick++
      }, 100)

      el.kll_cron = cron

      return runtime.findNext(this)
    },
  }
}
