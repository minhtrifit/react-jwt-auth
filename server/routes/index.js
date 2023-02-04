const autheRouter = require("../routes/auth.router.js");

function route(app) {
  app.use("/", autheRouter);
}

module.exports = route;
