import { recipes } from "../front/data/recipes"
import { shopFoodItems } from "../front/data/shop-food"

export function recipesCmd(_parser, runtime, tokens) {
  if (!tokens.matchToken("recipes")) return null

  return {
    async op(ctx) {
      const el = ctx.me
      console.log(el.state)

      const list = document.createElement("div")
      // On charge les recettes comme le shop

      recipes.forEach((recipe) => {
        const element = document.createElement("div")

        recipe.ingredients.forEach((ingredient) => {
          const { name } = ingredient
          const shopItem = shopFoodItems.find((item) => item.name === name)
          if (!shopItem) return
          const el = document.createElement("div")
          // element.setAttribute("_", `on load template 'recipe-item'`)
          el.innerHTML = `test`
          //TODO inserer dans la liste., juste icones et prix (quantity)
        })

        element.innerHTML = recipe.name
        list.appendChild(element)
      })
      // Recupérer les imgages via shopfood

      el.replaceWith(list)
      return runtime.findNext(this)
    },
  }
}
