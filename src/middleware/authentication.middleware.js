const jwtServices = require("../utils/jwtServices");
const sendResponse = require("../utils/sendResponse");
const responseStatusCodes = require("../utils/responseStatusCode");
// Assuming you have defined a type or interface for encryptData

const authentication = async (req, res, next) => {
  if (req.url.endsWith("login")) {
    console.log("if case");
    next();
    return;
  } else {
    console.log("else case");
    const authorization = req.headers.authorization;
    if (authorization) {
      try {
        const token = authorization.slice(7); // Remove "Bearer " prefix
        if (token) {
          const tokenData = await jwtServices.authenticate(token);
          if (tokenData) {
            req.query.user = tokenData?.user;
            next();
            return;
          } else {
            await sendResponse(
              res,
              responseStatusCodes.UNAUTHORIZED,
              "Authentication failed!",
              false,
              null,
              null
            );
            return;
          }
        } else {
          await sendResponse(
            res,
            responseStatusCodes.UNAUTHORIZED,
            "Authentication failed!",
            false,
            null,
            null
          );
          return;
        }
      } catch (error) {
        console.log("error: ", error);
        if (error.message === "jwt expired") {
          await sendResponse(
            res,
            responseStatusCodes.UNAUTHORIZED,
            "Authentication failed!",
            false,
            null,
            null
          );
          return;
        } else {
          await sendResponse(
            res,
            responseStatusCodes.UNAUTHORIZED,
            error.message,
            false,
            null,
            null
          );
          res.status(401).send({ msg: error.message });
          return;
        }
      }
    } else {
      await sendResponse(
        res,
        responseStatusCodes.UNAUTHORIZED,
        "Authentication failed!",
        false,
        null,
        null
      );
      return;
    }
  }
};

module.exports = authentication;
