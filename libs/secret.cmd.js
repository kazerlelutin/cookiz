import { getStore, saveFactory } from "../utils/save.utils"

export function updateMultiplier(multiplier) {
  const multipeEl = document.querySelector("#multiplier")
  if (!multipeEl || multiplier === 0) return
  if (multipeEl.getAttribute("data-trans")) multipeEl.removeAttribute("data-trans")
  multipeEl.innerText = `${multiplier} cookie${multiplier > 1 ? "s" : ""}/sec`
}

export function updateCookieMultiplier(multiplier) {
  const multipeEl = document.querySelector("#multiplier-cookie")
  if (!multipeEl || multiplier === 0) return
  multipeEl.innerText = `${multiplier} cookie${multiplier > 1 ? "s" : ""}/click`
}

export function secretCmd(parser, runtime, tokens) {
  if (!tokens.matchToken("secret")) return null
  const expr = parser.requireElement("expression", tokens)
  return {
    args: [expr],
    async op(ctx, name) {
      const el = ctx.me

      if (!el.state) el.state = {}

      const store = getStore()

      const isAlready = store.s.includes(name)

      if (el.state.disabled || isAlready) return runtime.findNext(this)
      const audioEl = document.querySelector("#coin-audio")

      if (!audioEl) return runtime.findNext(this)
      audioEl.currentTime = 0
      audioEl.volume = 0.5
      audioEl.play()

      // === per Second ===========================
      if (name === "sign") {
        store.m = store.m + 5
      }

      if (name === "doc") {
        store.m = store.m + 4
      }

      updateMultiplier(store.m)
      // === per Click ============================

      const oldMulti = store.cm === 1 ? 0 : store.cm

      if (name === "get-started") {
        store.cm = oldMulti + 5
      }

      if (name === "kll") {
        store.cm = oldMulti + 10
      }

      updateCookieMultiplier(store.cm)

      el.state.disabled = true
      el.style.opacity = 0.5

      store.cm = store.cm
      store.m = store.m
      store.s = [...store.s, name]

      saveFactory(store)

      // === RETURN ===========================
      return runtime.findNext(this)
    },
  }
}
