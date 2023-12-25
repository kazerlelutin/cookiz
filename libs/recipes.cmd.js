import { recipes } from "../front/data/recipes"
import { createRecipeIngredientEl } from "../utils/createRecipeIngredientEl"
import { setState } from "../utils/parse-state"
import { getFactory } from "../utils/save.utils"
import { translateStr } from "../utils/translate"

export function recipesCmd(_parser, runtime, tokens) {
  if (!tokens.matchToken("recipes")) return null

  return {
    async op(ctx) {
      const el = ctx.me

      const list = document.createElement("div")

      // On charge les recettes comme le shop

      const factory = getFactory()
      const unlock = factory.u || []

      recipes.forEach((recipe) => {
        const recipeEl = document.createElement("div")
        const isUnlock = unlock.includes(recipe.name)

        recipeEl.setAttribute("_", `on load template 'recipe-shop'`)

        // -- On charge les ingredients

        const state = {
          originalName: recipe.name,
          img: recipe.img,
          name: translateStr(recipe.name),
          isUnlock,
          ingredients: recipe.ingredients.map(createRecipeIngredientEl).filter((ing) => ing !== ""),
        }

        list.appendChild(setState(recipeEl, "recipe", state))

        // -------
      })
      el.replaceWith(list)

      return runtime.findNext(this)
    },
  }
}
