import { shop } from "../front/data/shop"
import { shopFoodItems } from "../front/data/shop-food"
import { getPrice } from "../utils/get-price"
import { setState } from "../utils/parse-state"
import { getStore, saveFactory } from "../utils/save.utils"
import { translateStr } from "../utils/translate"

export function shopCmd(_parser, runtime, tokens) {
  if (!tokens.matchToken("shop")) return null

  return {
    async op(ctx) {
      const el = ctx.me

      const list = document.createElement("div")

      list.classList.add("flex", "flex-col", "gap-2")

      const store = getStore()
      const shopFactory = store.sh || {}
      const shopFood = store.sf || {}

      Object.keys(shop).forEach((key) => {
        const { name } = shop[key]
        if (!shopFactory[name]) shopFactory[name] = 0
      })

      Object.keys(shopFoodItems).forEach((key) => {
        const { name } = shopFoodItems[key]
        if (!shopFood[name]) shopFood[name] = 0
      })

      shop.forEach((item) => {
        const possessed = shopFactory[item.name]
        // keep all prices in memory
        if (!store.p?.[item.name]) store.p[item.name] = 0
        const price = getPrice(item.price, store.p[item.name])
        const element = document.createElement("div")
        element.setAttribute("_", `on load template 'shop-item'`)

        const description = item.clickMultiplier
          ? `+${item.clickMultiplier} cookie${item.clickMultiplier > 1 ? "s" : ""}/click`
          : `+${item.secMultiplier} cookie${item.secMultiplier > 1 ? "s" : ""}/sec`

        list.appendChild(
          setState(element, "item", {
            ...item,
            originalName: item.name,
            name: translateStr(item.name),
            price: String(price).replace(/\B(?=(\d{3})+(?!\d))/g, " "),
            possessed,
            description,
            disabled: price > store.c,
          })
        )
      })

      shopFoodItems.forEach((item) => {
        const possessed = shopFood[item.name]

        // keep all prices in memory
        if (!store.p?.[item.name]) store.p[item.name] = 0

        const price = getPrice(item.price, store.p[item.name])

        const element = document.createElement("div")
        element.setAttribute("_", `on load template 'shop-food-item'`)

        list.appendChild(
          setState(element, "item", {
            ...item,
            originalName: item.name,
            name: translateStr(item.name),
            price: String(price).replace(/\B(?=(\d{3})+(?!\d))/g, " "),
            possessed,
            disabled: price > store.c,
          })
        )
      })

      el.state = {
        ...el.state,
        shopFactory,
        shopFood,
      }

      saveFactory({ sh: shopFactory, sf: shopFood, p: store.p })
      el.replaceWith(list)
      return runtime.findNext(this)
    },
  }
}
