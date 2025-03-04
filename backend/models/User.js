const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "teacher"] },
  class: { type: Number, required: true, min: 1, max: 10 }, // Ensuring class is between 1 and 10
});

module.exports = mongoose.model("User", UserSchema);
