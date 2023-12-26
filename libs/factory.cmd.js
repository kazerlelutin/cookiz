import { disabledShopItem } from "../utils/disabled-shop-item"
import { getStore, saveFactory } from "../utils/save.utils"
import { updateCookieMultiplier, updateMultiplier } from "./secret.cmd"

export function factoryCmd(_parser, runtime, tokens) {
  if (!tokens.matchToken("factory")) return null

  return {
    async op(ctx) {
      const el = ctx.me
      const store = getStore()

      const secretsEl = document.querySelectorAll("[_*='on click secret']")

      secretsEl.forEach((secretEl) => {
        const _hyp = secretEl.getAttribute("_")
        const _hypSplit = _hyp.replace(/[\s'`]/g, "").replace(/onclicksecret|end/g, "")

        const find = store.s.includes(_hypSplit)

        if (!find) return
        if (!secretEl.state) secretEl.state = {}
        secretEl.state.disabled = true
        secretEl.style.opacity = 0.5
      })

      updateCookieMultiplier(store.cm)
      updateMultiplier(store.m)

      const updateCount = async () => {
        if (store.m === 0 && store.c === 0) return
        store.c = store.c + 1 * store.m
      }

      const updateTitleAndSave = async () => {
        if (store.c === 0) return
        const isMillion = store.c >= 1000000
        const isBillion = store.c >= 1000000000
        const isTrillion = store.c >= 1000000000000
        const isQuadrillion = store.c >= 1000000000000000

        const text = `cookies - COOKIZE`
        if (isQuadrillion) {
          document.title = `${(store.c / 1000000000000000).toFixed(2)} quadrillion ${text}`
        } else if (isTrillion) {
          document.title = `${(store.c / 1000000000000).toFixed(2)} trillion ${text}`
        } else if (isBillion) {
          document.title = `${(store.c / 1000000000).toFixed(2)} billion ${text}`
        } else if (isMillion) {
          document.title = `${(store.c / 1000000).toFixed(2)} million ${text}`
        } else {
          document.title = `${store.c} ${text}`
        }

        saveFactory({
          c: store.c,
          cm: store.cm,
          m: store.m,
        })
      }

      let tick = 0
      const cron = setInterval(() => {
        // Update count every 10 ticks (1s)
        if (tick % 10 === 0) {
          updateCount()
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
