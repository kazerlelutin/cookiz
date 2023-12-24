/**
 * @description Async beacause use in cron
 * @returns
 */
export async function disabledShopItem() {
  const cookie = document.querySelector("#cookie")
  if (!cookie || !cookie?.state) return
  const shopItems = document.querySelectorAll("[_*='on click buy']")

  shopItems.forEach((shopItem) => {
    const item = shopItem?.state?.item

    if (!item) return
    const { price: priceStr } = item

    const price = Number(priceStr.replace(/\s/g, ""))
    if (!price) return
    if (price > cookie.state.count) {
      shopItem.state.disabled = true
      shopItem.style.opacity = 0.5
      shopItem.disabled = true
      return
    } else {
      shopItem.state.disabled = false
      shopItem.style.opacity = 1
      shopItem.disabled = false
    }
  })
}
