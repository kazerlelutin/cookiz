const e=`<template id="recipe-shop">\r
  <button class="border border-dashed border-cookiz-tile p-2 rounded-sm cursor-pointer flex flex-col gap-2"\r
    _=" on click recipe end" data-recipe>\r
\r
\r
    <div _="on load \r
        set :parent to closest <button/>\r
        set :recipe to  :parent.state.recipe\r
        put :recipe.name into first <div [data-name] /> in me\r
        set me.querySelector('[data-img]') @src to :recipe.img\r
        set me.querySelector('[data-img]') @alt to :recipe.name\r
\r
        if :recipe.isUnlock is false\r
        set :ht to \`\`\r
        for ingredient in :recipe.ingredients\r
          set :ht to \`\${:ht}\${ingredient}\`\r
        end\r
        put :ht into  the next <div [data-ingredients] />\r
        end\r
        end\r
      ">\r
\r
      <div class="flex flex-wrap gap-6 items-center justify-between">\r
        <div class="flex gap-2 items-center">\r
          <img data-img class="fill-white" src='' width="20" height="20" />\r
          <div data-name class="first-letter:uppercase font-InterBold"></div>\r
        </div>\r
      </div>\r
\r
    </div>\r
\r
    <div class="flex justify-between items-center gap-3 flex-wrap text-white text-sm italic" data-ingredients\r
      data-trans="recipe_shop_unlocked">\r
    </div>\r
\r
  </button>\r
</template>`;export{e as default};
