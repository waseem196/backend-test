const { validateRequest } = require("../../utils/validateRequest");
const express = require("express");
const authRouter = express.Router();
const authController = require("./authController");
const authValidator = require("./authValidator");
authRouter
  .route("/login")
  .post(validateRequest(authValidator.login), authController.login);
module.exports = authRouter;
