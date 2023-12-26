import { recipes } from "../front/data/recipes"
import { getStore, saveFactory } from "../utils/save.utils"
import { translateStr } from "../utils/translate"

export function recipeCmd(_parser, runtime, tokens) {
  if (!tokens.matchToken("recipe")) return null

  return {
    async op(ctx) {
      const el = ctx.me

      if (!el?.state?.recipe) return runtime.findNext(this)
      const {
        recipe: { isUnlock, originalName: name },
      } = el.state

      const store = getStore()
      const recipe = recipes.find((r) => r.name === name)
      const sf = { ...store.sf }

      if (!recipe) return runtime.findNext(this)

      if (!isUnlock) {
        const iHaveAllIngr = recipe.ingredients.every(
          (ingredient) => sf?.[ingredient.name] >= ingredient.quantity
        )

        if (!iHaveAllIngr) return runtime.findNext(this)

        recipe.ingredients.forEach((ingredient) => {
          sf[ingredient.name] -= ingredient.quantity
        })

        const ingrEl = document.querySelector(`[data-trans="recipe_shop_unlocked"]`)
        ingrEl.innerHTML = translateStr("recipe_shop_unlocked")
        console.log("recipe locked", sf)
        store.sf = { ...sf }
        store.u = [...store.u, name]
        saveFactory(store)
      }

      const dialog = document.createElement("dialog")

      //TODO mettre dans un template
      dialog.innerHTML = `
        <div class="flex justify-between sticky top-0 bg-black p-2">
          <h1 class="font-InterBold">${translateStr(name)}</h1>
          <button data-action="close" class="fill-cookiz-tile">
            <svg data-action="close" xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 512 512">
              <!--!Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.-->
              <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm97.9-320L320 158.1l-17 17-47 47-47-47-17-17L158.1 192l17 17 47 47-47 47-17 17L192 353.9l17-17 47-47 47 47 17 17L353.9 320l-17-17-47-47 47-47 17-17z" />
            </svg>
          </button>
        </div>
        
        <div class="flex flex-col gap-1 overflow-y-auto p-2">
          <h2 class="text-cookiz-margin uppercase border-b border-cookiz-line">${translateStr(
            "ingredients"
          )}</h2>
          ${recipe.ingredients
            .map(
              (ingredient, i) => `
          <div class="flex gap-1">
          <p class="font-InterBold">${ingredient.quantity} ${translateStr(ingredient.unit)}</p>
          <p>${translateStr(ingredient.name)}</p>
          </div>
          `
            )
            .join("")}
          <h2 class="text-cookiz-margin uppercase mt-5 border-b border-cookiz-line">${translateStr(
            "steps"
          )}</h2>
        ${recipe.steps
          .map(
            (step, i) => `
          <div class="mb-2">
          <h2 class="text-cookiz-margin first-letter:uppercase">${translateStr(step.action)}</h2>
          <p class="max-w-xl">${translateStr(step.description)}</p>
          </div>
          `
          )
          .join("")}
        </div>
      `

      dialog.addEventListener("click", (e) => {
        if (e.target.dataset.action === "close") {
          dialog.remove()
        }
      })

      document.body.appendChild(dialog)

      dialog.showModal()

      return runtime.findNext(this)
    },
  }
}
