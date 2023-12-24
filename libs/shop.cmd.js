import { shop } from "../front/data/shop"
import { shopFoodItems } from "../front/data/shop-food"
import { getPrice } from "../utils/get-price"
import { setState } from "../utils/parse-state"
import { getFactory, saveFactory } from "../utils/save.utils"
import { translateStr } from "../utils/translate"

export function shopCmd(_parser, runtime, tokens) {
  if (!tokens.matchToken("shop")) return null

  return {
    async op(ctx) {
      const el = ctx.me

      const list = document.createElement("div")

      list.classList.add("flex", "flex-col", "gap-2")

      const factory = getFactory()
      const shopFactory = factory.sh || {}
      const shopFood = factory.sf || {}

      Object.keys(shop).forEach((key) => {
        const { name } = shop[key]
        // Increment this each time we see a shop item
        if (!shopFactory[name]) shopFactory[name] = 1
      })

      Object.keys(shopFoodItems).forEach((key) => {
        const { name } = shopFoodItems[key]
        // Increment this each time we see a shop item
        if (!shopFood[name]) shopFood[name] = 1
      })

      shop.forEach((item) => {
        const possessed = shopFactory[item.name]
        const price = getPrice(item.price, possessed)
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
          })
        )
      })

      shopFoodItems.forEach((item) => {
        const possessed = shopFood[item.name]
        const price = getPrice(item.price, possessed, 2.3)
        const element = document.createElement("div")
        element.setAttribute("_", `on load template 'shop-food-item'`)

        const imgEl = element.querySelector("[data-img]")

        list.appendChild(
          setState(element, "item", {
            ...item,
            originalName: item.name,
            name: translateStr(item.name),
            price: String(price).replace(/\B(?=(\d{3})+(?!\d))/g, " "),
            possessed,
          })
        )
      })

      saveFactory({ sh: shopFactory, sf: shopFood })
      el.replaceWith(list)
      return runtime.findNext(this)
    },
  }
}
