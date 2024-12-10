const expressAsyncHandler = require("express-async-handler");
const sendResponse = require("../../utils/sendResponse");
const responseStatusCodes = require("../../utils/responseStatusCode");
const userService = require("../user/userService");
const jwtServices = require("../../utils/jwtServices");
const authController = {
  //  login
  login: expressAsyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userService.login(email);
    if (user) {
      const validatePassword = await userService.validatePassword(
        password,
        user.password
      );
      if (validatePassword) {
        const accessToken = await jwtServices.create(
          { user: user?._id },
          "365d"
        );
        user.accessToken = accessToken;
        delete user?.password;
        return await sendResponse(
          res,
          responseStatusCodes.OK,
          "Logged in Successfully",
          true,
          user,
          null
        );
      } else {
        return await sendResponse(
          res,
          responseStatusCodes.UNAUTHORIZED,
          "Invalid Credentials!",
          false,
          null,
          null
        );
      }
    } else {
      return await sendResponse(
        res,
        responseStatusCodes.UNAUTHORIZED,
        "Invalid Credentials!",
        false,
        user,
        null
      );
    }
  }),
};
module.exports = authController;
