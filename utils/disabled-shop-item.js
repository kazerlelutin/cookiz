import { getStore } from "./save.utils"

/**
 * @description Async beacause use in cron
 * @returns
 */
export async function disabledShopItem() {
  const shopItems = document.querySelectorAll("[_*='on click buy']")

  shopItems.forEach((shopItem) => {
    const store = getStore()
    const item = shopItem?.state?.item

    if (!item) return
    const { price: priceStr } = item

    const price = Number(priceStr.replace(/\s/g, ""))
    if (!price) return
    if (price > store.c) {
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
