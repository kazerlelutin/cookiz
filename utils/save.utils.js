import { getBase64FromText, getTextFromBase64 } from "./convert-base64.utils"

const LS_KEY = "cookize_factory"

export function getFactory() {
  const ls = localStorage.getItem(LS_KEY)

  const lsDecode = ls
    ? JSON.parse(getTextFromBase64(ls))
    : {
        c: 0,
        m: 0,
        cm: 0,
        s: [],
      }

  return lsDecode
}

export function saveFactory(factory) {
  const save = getFactory()
  const factoryToSave = {
    ...save,
    ...factory,
  }
  const saveEncode = getBase64FromText(JSON.stringify(factoryToSave))
  localStorage.setItem(LS_KEY, saveEncode)
}
