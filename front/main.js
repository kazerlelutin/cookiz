import "./statics/style.css"
import "./statics/_hyperscript.min.js"
import index from "./pages/index.html?raw"
import home from "./pages/home.html?raw"

import { kll } from "../libs/kll.js"
;(async () => {
  kll({
    "/": index,
    "/home": home,
  })
})()
