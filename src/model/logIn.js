const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const logInSession = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "user",
    },

    token: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("logInSession", logInSession);
