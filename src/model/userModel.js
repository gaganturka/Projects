const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: "firstName is required",
      trim: true,
    },
    lname: {
      type: String,
      required: "lastName is required",
      trim: true,
    },
    email: {
      type: String,
      require: "Email address is required",
      lowercase: true,
    },
    profileImage: {
      type: String,
      // required : 'profileImage image is required'
    },
    phone: {
      type: String,
      required: "phone Number is required",
    },
    password: {
      type: String,
      required: "password is required",
      // minlength : [8,'password must not be less then 8 digits'],
      // maxlength : [15, 'password must not be greater then 15 digits']
    },

    birthday: {
      type: String,
      required: "Date Of Birth is required",
    },

    country: { type: String, required: " country is required" },
    state: { type: String, required: "state is required" },
    street: { type: String, required: "street number is required" },
    city: { type: String, required: "city name is required" },
    zip_code: { type: Number, required: "pincode is required" },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("user", userSchema);
