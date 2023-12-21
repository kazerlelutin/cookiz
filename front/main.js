import "./statics/style.css"
import "./statics/_hyperscript.min.js"

import { kll } from "../libs/kll.js"
;(async () => {
  kll({
    "/": await import("./pages/index.html?raw"),
    "/home": await import("./pages/home.html?raw"),
  })
})()
