const t=`<div class="grid grid-rows-[auto_1fr_auto] h-[100dvh]">\r
  <br _="on load template 'header' end" />\r
\r
  <div class="sm:grid sm:grid-cols-2 flex flex-col-reverse gap-2 sm:justify-center justify-end items-center p-4">\r
\r
    <div class="sm:ml-6 sm:text-left text-center">\r
      <br _="on load template 'cookize' end" data-bind="c" />\r
      <div class="ml-7 italic" id="multiplier" data-trans="tagline">Enchanced your Team</div>\r
      <div class="mt-5 flex gap-3">\r
        <button _="on click secret 'get-started' end" data-trans="get-started"\r
          class="rounded-full border-white border bg-white text-black px-3 py-2 transition-all duration-100 hover:bg-black hover:text-white">\r
          Get started\r
        </button>\r
        <button _="on click secret 'doc' end" data-trans="documentation"\r
          class="rounded-full border-white border px-3 py-2 transition-all duration-100 hover:bg-white hover:text-black ">\r
          Documentation\r
        </button>\r
      </div>\r
    </div>\r
    <br _="on load template 'cookie' end" />\r
  </div>\r
  <br _="on load template 'footer' end" />\r
\r
  <span class="fixed" _="on load translate end"></span>\r
</div>`;export{t as default};
