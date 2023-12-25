import { parseState } from "../utils/parse-state"
import { translate } from "../utils/translate"

export function templateCmd(parser, runtime, tokens) {
  if (!tokens.matchToken("template")) return null

  const expr = parser.requireElement("expression", tokens)

  return {
    args: [expr],
    async op(ctx, templateName) {
      // Load template
      const raw = await import(`../front/templates/${templateName}.html?raw`)
      const el = document.createElement("div")
      if (!el.state) el.state = {}
      el.innerHTML = raw.default
      const template = el.querySelector(`#${templateName}`).content
      const componentInstance = document.importNode(template, true)
      const container = document.createElement("div")
      container.appendChild(componentInstance)

      // Current element
      const element = ctx.me
      const children = element.innerHTML

      // Copy attributes
      Object.keys(element.attributes).forEach((key) => {
        const attr = element.attributes[key]

        if (attr.name.includes("data-state-")) {
          if (!container.firstElementChild.state) container.firstElementChild.state = {}

          container.firstElementChild.state = {
            ...container.firstElementChild.state,
            [attr.name.replace("data-state-", "")]: parseState(attr.value),
          }
        } else if (attr.name.includes("data-")) {
          container.firstElementChild.setAttribute(attr.name, attr.value)
        }
      })

      // Replace slot
      if (container.innerHTML.includes("<slot>")) {
        const slot = container.querySelector("slot")
        slot.outerHTML = children
      }

      translate(container)
      container.firstElementChild.setAttribute("data-component", templateName)
      element.replaceWith(container.firstElementChild)
      _hyperscript.processNode(document.querySelector("#app"))
      return runtime.findNext(this)
    },
  }
}
