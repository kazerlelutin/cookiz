import { shopFoodItems } from "../front/data/shop-food"
import { setState } from "./parse-state"
import { getFactory } from "./save.utils"
import { translateStr } from "./translate"

export function createRecipeIngredientEl(ingredient) {
  const factory = getFactory()
  const shopFood = factory.sf || {}
  const { name } = ingredient
  const shopItem = shopFoodItems.find((item) => item.name === name)
  if (!shopItem) return ""

  const ingEl = document.createElement("div")
  ingEl.setAttribute("_", `on load template 'recipe-item'`)
  setState(ingEl, "item", {
    originalName: name,
    img: shopItem.img,
    name: translateStr(name),
    possessed: shopFood[name] || 0,
    quantity: ingredient.quantity,
  })

  return ingEl.outerHTML
}
