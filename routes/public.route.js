module.exports = {
  method: "GET",
  path: "/api/public/{param*}",
  handler: {
    directory: {
      path: "public",
      index: false,
    },
  },
}
