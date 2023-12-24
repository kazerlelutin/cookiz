export async function updateCounter(count) {
  const counterEl = document.querySelector("#counter")

  if (count === 0) return
  counterEl.innerText = count
    .toString()
    .padStart(2, "0")
    // add space every 3 digits
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")

  if (count < 100) return
  counterEl.style.fontSize = "4rem"
  if (count < 1000) return
  counterEl.style.fontSize = "3rem"
  if (count < 100000) return
  const cEl = document.querySelector("#c")
  if (cEl) cEl.remove()
  const kizEl = document.querySelector("#kiz")
  if (kizEl) kizEl.remove()
  if (count < 10000000) return
  counterEl.style.fontSize = "2rem"
}

export function cookieCmd(_parser, runtime, tokens) {
  if (!tokens.matchToken("cookie")) return null

  return {
    async op(ctx) {
      const el = ctx.me
      if (!el.state) el.state = {}
      el.style.transition = "transform .1s ease-in-out"
      el.style.transform = "scale(.9)"
      const audioEl = document.querySelector("#coin-audio")
      audioEl.currentTime = 0
      audioEl.volume = 0.5
      audioEl.play()
      setTimeout(() => {
        el.style.transform = "scale(1)"
      }, 50)

      const { count, clickMultiplier } = el.state

      el.state.count = count + 1 * clickMultiplier
      updateCounter(el.state.count)

      return runtime.findNext(this)
    },
  }
}
