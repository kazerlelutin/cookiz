import { getFactory, saveFactory } from "../utils/save.utils"

export function updateMultiplier(multiplier) {
  const multipeEl = document.querySelector("#multiplier")
  if (!multipeEl || multiplier === 0) return
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

      const factory = getFactory()
      const isAlready = factory.s.includes(name)

      if (el.stateDisabled || isAlready) return
      const cookie = document.querySelector("#cookie")
      const audioEl = document.querySelector("#coin-audio")

      if (!cookie || !audioEl) return
      audioEl.currentTime = 0
      audioEl.volume = 0.5
      audioEl.play()

      // === per Second ===========================
      if (name === "sign") {
        cookie.multiplier = cookie.multiplier + 5
      }

      if (name === "doc") {
        cookie.multiplier = cookie.multiplier + 4
      }

      updateMultiplier(cookie.multiplier)
      // === per Click ============================

      const oldMulti = cookie.clickMultiplier === 1 ? 0 : cookie.clickMultiplier

      if (name === "get-started") {
        cookie.clickMultiplier = oldMulti + 5
      }

      if (name === "kll") {
        cookie.clickMultiplier = oldMulti + 10
      }

      updateCookieMultiplier(cookie.clickMultiplier)

      el.stateDisabled = true
      el.style.opacity = 0.5

      factory.cm = cookie.clickMultiplier
      factory.s = [...factory.s, name]

      saveFactory(factory)

      // === RETURN ===========================
      return runtime.findNext(this)
    },
  }
}
