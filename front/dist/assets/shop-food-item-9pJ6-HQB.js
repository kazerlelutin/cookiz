const e=`<template id="shop-food-item">\r
  <button _="on load \r
    set @disabled to me.state.item.disabled\r
    if @disabled is equal 'true' set *opacity to 0.5 end\r
    put me.state.item.price into first <div [data-price] /> in me\r
    put me.state.item.name into first <div [data-name] /> in me\r
    set me.querySelector('[data-img]') @src to me.state.item.img\r
    set me.querySelector('[data-img]') @alt to me.state.item.name\r
    put me.state.item.possessed into first <div [data-possessed] /> in me\r
    \r
    on click buy end\r
    " class="border border-dashed border-cookiz-tile p-2 rounded-sm cursor-pointer">\r
\r
    <div class="flex flex-wrap gap-6 items-center justify-between ">\r
      <div class="flex gap-2 items-center">\r
        <img data-img class="fill-white" src='' width="20" height="20" />\r
        <div data-name class="first-letter:uppercase font-InterBold"></div>\r
      </div>\r
\r
      <div class=" flex gap-1 items-center">\r
        <div>🍪</div>\r
        <div data-price></div>\r
      </div>\r
\r
    </div>\r
    <div class="flex justify-between items-center gap-3 flex-wrap">\r
      <div data-description class="text-cookiz-margin text-xs" data-trans="food_desc">\r
\r
      </div>\r
      <div class="text-sm italic text-end text-cookiz-tile">\r
        <span data-trans="possessed"></span>:\r
        <span data-possessed class="font-InterBold"></span>\r
      </div>\r
    </div>\r
\r
  </button>\r
</template>`;export{e as default};
