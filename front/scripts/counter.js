export function updateCounter(count) {
  const counterEl = document.querySelector("#counter")

  if (count === 0) return
  counterEl.innerText = count.toString().padStart(2, "0")
  if (count < 100) return
  counterEl.style.fontSize = "4rem"
  if (count < 1000) return
  counterEl.style.fontSize = "2rem"
  if (count < 100000) return
  const cEl = document.querySelector("#c")
  if (cEl) cEl.remove()
  counterEl.style.fontSize = "1rem"
  if (count < 10000000) return
  const kizEl = document.querySelector("#kiz")
  if (kizEl) kizEl.remove()
  counterEl.style.fontSize = ".8rem"
}
