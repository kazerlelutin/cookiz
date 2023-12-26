import { shop } from "../front/data/shop"
import { shopFoodItems } from "../front/data/shop-food"
import { getPrice } from "../utils/get-price"
import { getStore, saveFactory } from "../utils/save.utils"
import { updateCookieMultiplier, updateMultiplier } from "./secret.cmd"

export function buyCmd(_parser, runtime, tokens) {
  if (!tokens.matchToken("buy")) return null

  return {
    async op(ctx) {
      const el = ctx.me
      const cookie = document.querySelector("#cookie")
      const store = getStore()

      if (!cookie || !cookie?.state || !store || !store.sh || !store.sf)
        return runtime.findNext(this)

      const count = cookie.state.count ?? 0

      const item = el.state.item
      const shopItem = [...shop, ...shopFoodItems].find((s) => s.name === item.originalName)
      if (!item || !shopItem) return runtime.findNext(this)
      const { price: priceStr } = item
      const price = Number(priceStr.replace(/\s/g, ""))
      if (!price) return runtime.findNext(this)
      if (count < price) return runtime.findNext(this)

      const { multiplier, clickMultiplier } = cookie.state
      const { clickMultiplier: itemCm, secMultiplier: itemM } = item

      const newItemCount = item.possessed + 1
      const newM = multiplier + (itemM ?? 0)
      const newCm = clickMultiplier + (itemCm ?? 0)
      const newCount = count - price
      const newPrice = getPrice(shopItem.price, newItemCount)

      el.state.item = {
        ...item,
        possessed: newItemCount,
        price: String(newPrice).replace(/\B(?=(\d{3})+(?!\d))/g, " "),
      }

      if (itemCm) cookie.state.clickMultiplier = newCm
      if (itemM) cookie.state.multiplier = newM
      if (store.sh?.[item.originalName] >= 0) {
        store.sh = {
          ...store.sh,
          [item.originalName]: newItemCount,
        }
      }
      if (store.sf?.[item.originalName] >= 0) {
        store.sf = {
          ...store.sf,
          [item.originalName]: newItemCount,
        }
      }

      cookie.state.count = newCount
      updateCookieMultiplier(newCm)
      updateMultiplier(newM)

      saveFactory({
        c: newCount,
        cm: newCm,
        m: newM,
        sh: store.sh,
        sf: store.sf,
      })

      const priceEl = el.querySelector("[data-price")
      const possessedEl = el.querySelector("[data-possessed")

      priceEl.innerText = el.state.item.price
      possessedEl.innerText = el.state.item.possessed

      return runtime.findNext(this)
    },
  }
}
