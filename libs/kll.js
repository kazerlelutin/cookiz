import { buyCmd } from "./buy.cmd"
import { cookieCmd } from "./cookie.cmd"
import { factoryCmd } from "./factory.cmd"
import { secretCmd } from "./secret.cmd"
import { shopCmd } from "./shop.cmd"
import { getStateCmd } from "./state.cmd"
import { templateCmd } from "./template.cmd"
import { toggleDrawerCmd } from "./toogle-drawer.cmd"
import { translateCmd } from "./translate.cmd"

function injectPage(path) {
  const routes = document.querySelector("#app").routes
  const page = routes[path]?.default
  if (page) {
    const appElement = document.querySelector("#app")
    appElement.innerHTML = page

    // Appeler _hyperscript.processNode sur le nouveau contenu
    _hyperscript.processNode(appElement)
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // === DRAWERS ========================================
  document.addEventListener("click", function (event) {
    const drawers = document.querySelectorAll("[data-drawer='true']")
    drawers.forEach((drawer) => {
      const _hyp = event.target.getAttribute("_") || ""
      if (!drawer.contains(event.target) && !_hyp.match(/toogleDrawer/)) {
        drawer.style.transform = "translateX(100%)"
      }
    })
  })
  // === COMMANDES ========================================

  _hyperscript.addCommand("navigate", (parser, runtime, tokens) => {
    if (!tokens.matchToken("navigate")) return null

    const expr = parser.requireElement("expression", tokens)

    return {
      args: [expr],
      async op(_ctx, url) {
        window.history.pushState({}, "", url)
        injectPage(url)
        return runtime.findNext(this)
      },
    }
  })

  _hyperscript.addCommand("template", templateCmd)
  _hyperscript.addCommand("factory", factoryCmd)
  _hyperscript.addCommand("cookie", cookieCmd)
  _hyperscript.addCommand("secret", secretCmd)
  _hyperscript.addCommand("translate", translateCmd)
  _hyperscript.addCommand("toogleDrawer", toggleDrawerCmd)
  _hyperscript.addCommand("getState", getStateCmd)
  _hyperscript.addCommand("shop", shopCmd)
  _hyperscript.addCommand("buy", buyCmd)
})

/**
 * @description Initializes the router and sets up event listeners.
 */
export function kll(routes) {
  const appElement = document.querySelector("#app")
  appElement.routes = routes
  injectPage(window.location.pathname)
}
