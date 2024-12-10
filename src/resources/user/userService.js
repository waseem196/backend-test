const User = require("./userModel");
const bcrypt = require("bcrypt");
const userService = {
  login: async (email) => {
    return await User.findOne({ email: email }).lean();
  },
  validatePassword: async (password, realPassword) => {
    return await bcrypt.compare(password, realPassword);
  },
};
module.exports = userService;
