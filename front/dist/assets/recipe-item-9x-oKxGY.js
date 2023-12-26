const e=`<template id="recipe-item">\r
  <div _="on load \r
    put me.state.item.name into first <div [data-name] /> in me\r
    put me.state.item.img into first <div [data-img] /> in me\r
    set me.querySelector('[data-img]') @src to me.state.item.img\r
    set me.querySelector('[data-img]') @alt to me.state.item.name\r
    put me.state.item.possessed into first <div [data-possessed] /> in me\r
    put me.state.item.quantity into first <div [data-quantity] /> in me\r
    set @data-ingredient to me.state.item.name\r
    if me.state.item.quantity > me.state.item.possessed\r
      set me @class to 'opacity-75'\r
    end\r
    end\r
    " class="rounded-md cursor-pointer text-xs border border-slate-800 p-1 not-italic">\r
\r
    <div class="flex gap-3 items-center justify-between ">\r
      <div class="flex gap-2 items-center">\r
        <img data-img class="fill-white" src='' width="15" height="15" />\r
        <div data-name class="first-letter:uppercase"></div>\r
      </div>\r
      <div class=" flex gap-1 items-center">\r
        <span data-possessed></span>\r
        /\r
        <span data-quantity></span>\r
      </div>\r
    </div>\r
  </div>\r
  </div>\r
</template>`;export{e as default};
