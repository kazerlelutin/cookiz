/**
 *
 * @description Refreshes all components with the given name
 * @param {String} name - The name of the component to refresh
 */
export function refreshComponents(name) {
  const components = document.querySelectorAll(`[data-component="${name}"]`)
  components.forEach((component) => {
    component.innerHTML = `<br _="on load template '${name}' end" />`
    _hyperscript.processNode(component.parentElement)
  })
}
