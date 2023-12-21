const e=`<template id="header">\r
  <header class="flex p-2 justify-between items-center">\r
    <div class="text-slate-500 cursor-pointer" _="on click secret 'kll'">_KLL</div>\r
    <nav class="self-end flex gap-2">\r
      <a _="on click navigate '/' end" data-trans="home">Home</a>\r
      <a data-trans="about" href="#">About</a>\r
      <a href="https://bouteiller.contact" target="_blank" data-trans="contact" rel="noopener">Contact</a>\r
      <div data-trans="pricing">Pricing</div>\r
    </nav>\r
    <button _="on click secret \`sign\` end" data-trans="sign_in"\r
      class="rounded-full border-white border px-3 py-1 transition-all duration-100 hover:bg-white hover:text-black ">\r
\r
    </button>\r
  </header>\r
</template>`;export{e as default};
