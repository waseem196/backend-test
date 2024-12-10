const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    car_model: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      default: 0,
      required: true,
    },
    phone: String,
    city: {
      type: String,
      required: true,
      enum: ["Karachi", "Lahore"],
    },
    pictures: [String],
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.model("Car", schema);
module.exports = Car;
