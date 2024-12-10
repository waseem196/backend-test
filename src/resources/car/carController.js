const expressAsyncHandler = require("express-async-handler");
const sendResponse = require("../../utils/sendResponse");
const responseStatusCodes = require("../../utils/responseStatusCode");
const carService = require("./carService");
const upload = require("../../utils/uploadFile");
const carController = {
  //  Create
  create: expressAsyncHandler(async (req, res, next) => {
    req.body.user = req.query.user;
    const car = await carService.create(req.body);
    return await sendResponse(
      res,
      responseStatusCodes.CREATED,
      "Created",
      true,
      car,
      null
    );
  }),
  get: expressAsyncHandler(async (req, res, next) => {
    const car = await carService.get(req.query.user);
    return await sendResponse(
      res,
      responseStatusCodes.OK,
      "Cars",
      true,
      car,
      null
    );
  }),
};
module.exports = carController;
