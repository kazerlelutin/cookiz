import { getFactory, saveFactory } from "../utils/save.utils"

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

      const factory = getFactory()

      const isAlready = factory.s.includes(name)

      if (el.state.disabled || isAlready) return runtime.findNext(this)
      const cookie = document.querySelector("#cookie")
      const audioEl = document.querySelector("#coin-audio")

      if (!cookie || !audioEl) return runtime.findNext(this)
      audioEl.currentTime = 0
      audioEl.volume = 0.5
      audioEl.play()

      // === per Second ===========================
      if (name === "sign") {
        cookie.state.multiplier = cookie.state.multiplier + 5
      }

      if (name === "doc") {
        cookie.state.multiplier = cookie.state.multiplier + 4
      }

      updateMultiplier(cookie.state.multiplier)
      // === per Click ============================

      const oldMulti = cookie.state.clickMultiplier === 1 ? 0 : cookie.state.clickMultiplier

      if (name === "get-started") {
        cookie.state.clickMultiplier = oldMulti + 5
      }

      if (name === "kll") {
        cookie.state.clickMultiplier = oldMulti + 10
      }

      updateCookieMultiplier(cookie.state.clickMultiplier)

      el.state.disabled = true
      el.style.opacity = 0.5

      factory.cm = cookie.state.clickMultiplier
      factory.m = cookie.state.multiplier
      factory.s = [...factory.s, name]

      saveFactory(factory)

      // === RETURN ===========================
      return runtime.findNext(this)
    },
  }
}
