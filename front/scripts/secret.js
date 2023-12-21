function updateMultiplier(multiplier) {
  const multipeEl = document.querySelector("#multiplier")
  if (!multipeEl || multiplier === 0) return
  multipeEl.innerText = `${multiplier} cookie${multiplier > 1 ? "s" : ""}/sec`
}

function updateCookieMultiplier(multiplier) {
  const multipeEl = document.querySelector("#multiplier-cookie")
  if (!multipeEl || multiplier === 0) return
  multipeEl.innerText = `${multiplier} cookie${multiplier > 1 ? "s" : ""}/click`
}

export async function secret(ctx, name) {
  const el = ctx.me

  if (el.stateDisabled) return
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
}
