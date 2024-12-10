const { validateRequest } = require("../../utils/validateRequest");
const express = require("express");
const carRouter = express.Router();
const carController = require("./carController");
const carValidator = require("./carValidator");
carRouter
  .route("/")
  .post(validateRequest(carValidator.create), carController.create)
  .get(carController.get);
module.exports = carRouter;
