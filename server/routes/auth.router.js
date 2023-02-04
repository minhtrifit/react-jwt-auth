var express = require("express");
var router = express.Router();
const AuthController = require("../controller/auth.controller.js");
const verifyToken = require("../middlewares/jwtAuth.js");

router.get("/", AuthController.getConnectServer);
router.get("/account", AuthController.getAllAccounts);
router.post("/register", AuthController.createNewAccount);
router.post("/login", AuthController.handleLogin);
router.post("/verify", verifyToken, AuthController.handleVerify); // Check auth

// NOTE: Request from client to server must be: object type

module.exports = router;
