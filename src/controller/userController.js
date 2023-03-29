const userModel = require("../model/userModel");
const validator = require("../helper/helper");
const aws = require("./aws");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { sendSucess, sendError } = require("../helper/helper");
const salt = 10;
const logInSession = require("../model/logIn");

const register = async (req, res) => {
  try {
    const requestBody = req.body;

    const schema = Joi.object().keys({
      fname: Joi.string().alphanum().min(3).required().label("First Name"),
      lname: Joi.string().alphanum().min(3).required().label("Last Name"),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      password: Joi.string().min(7).required(),
      confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
      birthday: Joi.date().max("1-1-2004").iso(),
      country: Joi.string().required(),
      state: Joi.string().required(),
      street: Joi.string().required(),
      city: Joi.string().required(),
      zip_code: Joi.number().required(),
    });

    const result = schema.validate(requestBody);

    if (result.error == null) {
      const {
        fname,
        lname,
        email,
        phone,
        password,
        birthday,
        country,
        state,
        street,
        city,
        zip_code,
      } = requestBody;
      const isEmailInUse = await userModel.findOne({ email: email });
      if (isEmailInUse) {
        return sendError(
          { message: "email already registered, enter different email" },
          res
        );
      }
      const isPhoneInUse = await userModel.findOne({ phone: phone });
      if (isPhoneInUse) {
        return sendError(
          { message: "phone number already registered, enter different numbe" },
          res
        );
      }
      // // conveting password into encrypted password
      const hash = await bcrypt.hash(password, salt);
      requestBody.password = hash;

      console.log("requestBody", requestBody);
      // const link = await aws.getProfileImgLink(req, res);
      // // requestBody.profileImage = link

      const userData = {
        fname: fname,
        lname: lname,
        email: email,
        // profileImage: link,
        phone: phone,
        password: hash,
        birthday: birthday,
        country: country,
        state: state,
        street: street,
        city: city,
        zip_code: zip_code,
      };
      console.log("userData", userData);

      const user = await userModel.create(userData);
      if (user) {
        sendSucess({ message: "User created successfully", data: user }, res);
      }
    } else {
      sendError(result.error, res);
    }
  } catch (error) {
    console.log("errorrr", error);
    return res.status(500).send({ status: false, message: error.message });
  }
};

const userlogin = async function (req, res) {
  try {
    const requestBody = req.body;

    const emailId = req.body.email;
    const password = req.body.password;

    if (!(emailId || password)) {
      return res
        .status(400)
        .send({ status: false, message: "email or password is missing" });
    }

    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(7).required(),
    });

    const result = schema.validate(requestBody);

    if (result.error == null) {
      const login = await userModel.findOne({ email: emailId });
      if (!login) {
        sendError({ message: "email is not register", statusCode: 404 }, res);
      }
      bcrypt.compare(password, login.password, (err, result) => {
        if (result === true) {
          let token = jwt.sign(
            {
              userId: login._id,
              iat: Math.floor(Date.now() / 1000),
              exp: Math.floor(Date.now() / 1000) + 2 * 60 * 60,
            },
            "projectfivegroup20"
          );
          // res.status(200).setHeader("api-token-key", token);
          const sessionData = {};
          sessionData["userId"] = login._id;
          sessionData["token"] = token;


          const session = logInSession.create(sessionData).then((response) => {
           return sendSucess(
              {
                message: "User login successfull",
                data: { userId: response.userId, Token: response.token },
              },
              res
            );
            }).catch((error) => {
                console.log('error', error
                );
               return sendError({ message: error }, res);
          })
        } else {
          sendError({ message: "incorrect password" }, res);
        }
      });
    } else {
      sendError(result.error, res);
    }
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};

const getUserProfile = async function (req, res) {
  try {
    let userId = req.params.userId;

    if (!(validator.isValid(userId) && validator.isValidObjectId(userId))) {
      return res
        .status(400)
        .send({ status: false, message: "user  Id not valid" });
    }

    console.log('user', userId)

    let getUserProfile = await userModel.findById(userId).lean()
    //here lean is used because we want to delete password from data base
    if (!getUserProfile) {
        console.log('user', getUserProfile)

      return sendError({ message: "User Not Found", statusCode: 404 }, res);
    }
    delete getUserProfile.password
    return sendSucess(
      { message: "User profile details", data: getUserProfile },
      res
    );
  } catch (err) {
    //   console.log("This is the error :", err.message);
    return res.status(500).send({ status: false, error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
 

    const requestBody = req.body;

    const schema = Joi.object().keys({
      fname: Joi.string().alphanum().min(3).required().label("First Name"),
      lname: Joi.string().alphanum().min(3).required().label("Last Name"),
      birthday: Joi.date().max("1-1-2004").iso(),
      country: Joi.string().required(),
      state: Joi.string().required(),
      street: Joi.string().required(),
      city: Joi.string().required(),
      zip_code: Joi.number().required(),
    }).unknown(true);

    console.log(" befpor eerequestBody", requestBody);

    if (requestBody.phone) {
      delete requestBody.phone;
    } 
    if (requestBody.email) {
      delete requestBody.email;
    }

    console.log(" after eerequestBody", requestBody);

    const result = schema.validate(requestBody);

    if (result.error == null) {
      const {
        fname,
        lname,
        birthday,
        country,
        state,
        street,
        city,
        zip_code,
      } = requestBody;
    
  
      // const link = await aws.getProfileImgLink(req, res);
      // // requestBody.profileImage = link

      const userData = {
        fname: fname,
        lname: lname,
        // profileImage: link,
        birthday: birthday,
        country: country,
        state: state,
        street: street,
        city: city,
        zip_code: zip_code,
      };

      const user = await userModel.findOneAndUpdate({_id : requestBody._id}, userData, {new : true});
      if (user) {
        sendSucess({ message: "User's Data Updated successfully", data: user }, res);
      }
    } else {
      sendError(result.error, res);
    }
    
    //   //JSON.parse(JSON.stringify(req.body))
    //     const files = req.files;

  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports.register = register;
module.exports.getUserProfile = getUserProfile;
module.exports.userlogin = userlogin;
module.exports.updateUser = updateUser;
