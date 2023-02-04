const bcrypt = require("bcrypt");
const db = require("../model/db.model.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class AuthController {
  getConnectServer = async (req, res, next) => {
    try {
      res.status(200).json({
        message: "Server run successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  getAllAccounts = async (req, res, next) => {
    try {
      const accountList = await db.getAllAccounts();

      res.status(200).json({
        message: "success",
        data: accountList,
      });
    } catch (error) {
      next(error);
    }
  };

  createNewAccount = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      console.log(username, password);

      const checkExistAccount = await db.getAccountByUsername(username);
      if (checkExistAccount.length !== 0) {
        res.status(200).json({
          message: "accounts already exist",
        });
      } else {
        const hashPassword = await bcrypt.hash(password, 10);
        console.log(hashPassword);

        const newAccount = {
          username: username,
          password: hashPassword,
        };
        await db.createNewAccount(newAccount);
        res.status(200).json({
          message: "success",
          account: newAccount,
        });
      }
    } catch (error) {
      next(error);
    }
  };

  handleLogin = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      console.log(username, password);
      const targetAccount = await db.getAccountByUsername(username);

      // Account does not exist
      if (targetAccount.length === 0) {
        console.log("Account does not exist");
        res.status(404).json({
          message: "Account does not exist",
        });
      } else {
        const checkPassword = await bcrypt.compare(
          password,
          targetAccount[0].password
        );

        // Wrong username or password
        if (!checkPassword) {
          res.status(501).json({
            message: "Username or password incorrect",
          });
        } else {
          // Create token and send to client
          const payload = {
            username: targetAccount[0].username,
          };
          const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: "1h",
          });

          res.status(200).json({
            message: "success",
            account: targetAccount[0],
            token: token,
          });
        }
      }
    } catch (error) {
      next(error);
    }
  };

  handleVerify = async (req, res, next) => {
    try {
      const middlewareUsername = req.user; // Get username from middleware
      // console.log(middlewareUsername);
      const targetUser = await db.getAccountByUsername(middlewareUsername);
      console.log(targetUser[0]);

      res.status(200).json({
        message: "success",
        user: targetUser[0],
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new AuthController();
