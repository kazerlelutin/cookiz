import { translate } from "../utils/translate"

export function translateCmd(_parser, runtime, tokens) {
  if (!tokens.matchToken("translate")) return null

  return {
    async op() {
      translate()
      return runtime.findNext(this)
    },
  }
}
