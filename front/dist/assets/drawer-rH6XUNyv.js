const t=`<template id="drawer">\r
  <nav\r
    class="fixed top-0 bottom-0 right-0 transition-transform duration-200 mw-[30dvw] bg-black z-50 pl-5 pr-5 pb-5  overflow-y-auto"\r
    style="transform: translateX(100%);" data-drawer='true'>\r
    <div class="mb-2 flex justify-between gap-2  py-2 border-b border-b-slate-900 sticky top-0 bg-black">\r
      <button _="\r
        on load set :name to the @data-name of the closest <nav/> end\r
        on click toogleDrawer :name end\r
        " class=" fill-cookiz-tile">\r
        <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 512 512">\r
          <!--!Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.-->\r
          <path\r
            d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm97.9-320L320 158.1l-17 17-47 47-47-47-17-17L158.1 192l17 17 47 47-47 47-17 17L192 353.9l17-17 47-47 47 47 17 17L353.9 320l-17-17-47-47 47-47 17-17z" />\r
        </svg>\r
      </button>\r
      <div data-type="title" _="on load set @data-trans to the @data-title of the closest <nav/> translate"\r
        class="text-cookiz-margin font-bold">\r
      </div>\r
    </div>\r
    <slot />\r
  </nav>\r
</template>`;export{t as default};
