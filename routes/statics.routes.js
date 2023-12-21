module.exports = {
  method: "GET",
  path: "/statics/{param*}",
  handler: {
    directory: {
      path: "front/statics",
      index: false,
    },
  },
}
