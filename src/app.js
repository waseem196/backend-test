const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./middleware/errorHandler.middleware");
const authentication = require("./middleware/authentication.middleware");
//import dotenv
dotenv.config();
require("./db/db");
const sendResponse = require("./utils/sendResponse");
const responseStatusCodes = require("./utils/responseStatusCode");
const authRouter = require("../src/resources/auth/authRouter");
const carRouter = require("./resources/car/carRouter");

const app = express();

const corsOptions = {
  origin: "*", // or specify the allowed origins
};
app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));

//default route
app.get("/", (req, res) => {
  res.status(200).send({ msg: "Welcome To Note-IQ Server" });
});

// print called route
app.use((req, res, next) => {
  console.log(`Route called: ${req.originalUrl}`);
  next();
});

//middleware
app.use(authentication);
//apis routes
app.use("/api/auth", authRouter);
app.use("/api/car", carRouter);

// app.use("/api/submodule", submoduleRouter);

// Error handling middleware
app.use(errorHandler);

// 404 handler (should come after all your specific route handlers)
app.use(async (req, res) => {
  await sendResponse(
    res,
    responseStatusCodes.NOTFOUND,
    "Not Found",
    false,
    null,
    null
  );

  return;
});

module.exports = app;
