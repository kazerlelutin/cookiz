export function toggleDrawerCmd(_parser, runtime, tokens) {
  if (!tokens.matchToken("unlock")) return null

  return {
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
