const bcrypt = require("bcrypt");
const Car = require("./carModel");
const { uploadFile } = require("../../utils/uploadFile");
const carService = {
  create: async (body) => {
    if (body?.pictures?.length !== 0) {
      body.pictures = await uploadFile(body?.pictures);
    }
    const data = new Car(body);
    return await data.save();
  },
  get: async (user) => {
    return await Car.find({ user: user });
  },
};
module.exports = carService;
