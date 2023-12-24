export function toggleDrawerCmd(parser, runtime, tokens) {
  if (!tokens.matchToken("toogleDrawer")) return null

  const expr = parser.requireElement("expression", tokens)

  return {
    args: [expr],
    async op(_ctx, drawerName) {
      const drawers = document.querySelectorAll("[data-drawer='true']")
      drawers.forEach((drawer) => {
        const name = drawer.getAttribute("data-name")

        if (name !== drawerName) {
          drawer.style.transform = "translateX(100%)"
        } else {
          const transformStr = "translateX(100%)"
          drawer.style.transform = drawer.style.transform ? "" : transformStr
        }
      })

      return runtime.findNext(this)
    },
  }
}
