export function getStateCmd(_parser, runtime, tokens) {
  if (!tokens.matchToken("getState")) return null

  return {
    async op(ctx) {
      const el = ctx.me
      console.log(el.state)
      return runtime.findNext(this)
    },
  }
}
