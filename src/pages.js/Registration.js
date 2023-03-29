import { useState } from "react";
import { httpPost } from "../Action";
import { showError, showSucess } from "../helper.js/helper";
import firebase from "firebase";

import { auth } from "../helper.js/firebase";
import { useNavigate, Link } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [otp, setotp] = useState("");
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState("");

  const signin = () => {
    let mynumber = data.phone;

    if (mynumber === "" || mynumber.length < 10) return;
    let verify = new firebase.auth.RecaptchaVerifier("recaptcha-container");
    auth
      .signInWithPhoneNumber(mynumber, verify)
      .then((result) => {
        console.log("result", result);
        setfinal(result);
        alert("code sent");
        setshow(true);
      })
      .catch((err) => {
        alert(err);
        window.location.reload();
      });
  };

  // Validate OTP
  const ValidateOtp = (e) => {
    e.preventDefault();
    if (otp === null || final === null) return;
    final
      .confirm(otp)
      .then((result) => {
        navigate("/Login");
        alert("You registered succesfully");
      })
      .catch((err) => {
        navigate("/Login");
        alert("please try again");
      });
  };

  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    birthday: "",
    country: "",
    state: "",
    street: "",
    city: "",
    zip_code: "",
  });

  const onChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    httpPost("register", data)
      .then(function (response) {
        console.log(response);
        if (response.statusCode == 400) {
          showError(response.message);
        } else {
          showSucess(response.message);
          signin()
            .then((result) => {
              console.log("result", result);
            })
            .catch((err) => {
              alert("Wrong code");
            });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      {show ? (
        <>
          <div className="container">
            <form className="form-horizontal" role="form">
              <h2>Enter otp</h2>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder={"Enter your OTP"}
                  onChange={(e) => {
                    setotp(e.target.value);
                  }}
                ></input>
                <br />
                <br />
                <button
                  className="btn btn-primary btn-block"
                  onClick={ValidateOtp}
                >
                  Verify
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <div className="container">
          <form className="form-horizontal" role="form">
            <h2>Registration</h2>
            <div className="form-group">
              <label htmlFor="firstName" className="col-sm-3 control-label">
                First Name
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  id="firstName"
                  placeholder="First Name"
                  name="fname"
                  value={data.fname}
                  className="form-control"
                  autoFocus
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="lastName" className="col-sm-3 control-label">
                Last Name
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  id="lastName"
                  name="lname"
                  value={data.lname}
                  placeholder="Last Name"
                  className="form-control"
                  autoFocus
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email" className="col-sm-3 control-label">
                Email*{" "}
              </label>
              <div className="col-sm-9">
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="form-control"
                  name="email"
                  value={data.email}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password" className="col-sm-3 control-label">
                Password*
              </label>
              <div className="col-sm-9">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={data.password}
                  placeholder="Password"
                  className="form-control"
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password" className="col-sm-3 control-label">
                Confirm Password*
              </label>
              <div className="col-sm-9">
                <input
                  type="password"
                  id="Confirm"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  placeholder="Password"
                  className="form-control"
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="birthDate" className="col-sm-3 control-label">
                Date of Birth*
              </label>
              <div className="col-sm-9">
                <input
                  type="date"
                  id="birthDate"
                  className="form-control"
                  name="birthday"
                  value={data.birthday}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber" className="col-sm-3 control-label">
                Phone number{" "}
              </label>
              <div className="col-sm-9">
                <input
                  // maxLength={10}
                  type="phoneNumber"
                  id="phoneNumber"
                  name="phone"
                  value={data.phone}
                  placeholder="Phone number"
                  className="form-control"
                  onChange={onChange}
                />

                <span className="help-block">
                  Your phone number won't be disclosed anywhere{" "}
                </span>
              </div>
            </div>

            <div className="form-group">
              <div className="row pb-3">
                <div className="col-sm-5">
                  <label htmlFor="zip_code" className="col-sm-3 control-label">
                    zip_code*{" "}
                  </label>
                  <input
                    type="number"
                    id="zip_code"
                    placeholder="zip_code"
                    className="form-control"
                    name="zip_code"
                    maxLength={6}
                    value={data.zip_code}
                    onChange={onChange}
                  />
                </div>
                <div className="col-sm-5">
                  <label htmlFor="street" className="col-sm-3 control-label">
                    street*{" "}
                  </label>
                  <input
                    type="text"
                    id="street"
                    placeholder="street"
                    className="form-control"
                    name="street"
                    value={data.street}
                    onChange={onChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-sm-4">
                  <label htmlFor="city" className="col-sm-3 control-label">
                    city*{" "}
                  </label>
                  <input
                    type="text"
                    id="city"
                    placeholder="  city"
                    name="city"
                    value={data.city}
                    className="form-control"
                    onChange={onChange}
                  />
                </div>

                <div className="col-sm-4">
                  <label htmlFor="state" className="col-sm-3 control-label">
                    state*{" "}
                  </label>
                  <input
                    type="text"
                    id="state"
                    placeholder="state"
                    name="state"
                    value={data.state}
                    className="form-control"
                    onChange={onChange}
                  />
                </div>

                <div className="col-sm-4">
                  <label htmlFor="country" className="col-sm-3 control-label">
                    country*{" "}
                  </label>
                  <input
                    type="text"
                    id="country"
                    placeholder="country"
                    name="country"
                    value={data.country}
                    className="form-control"
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="col-sm-9 col-sm-offset-3"></div>
            </div>
            <button
              type="submit"
              onClick={submit}
              className="btn btn-primary btn-block"
            >
              Register
            </button>
            <div className="text-center">
              <Link to="/log-in">Login</Link>
            </div>
            <div id="recaptcha-container"></div>
          </form>
        </div>
      )}
    </>
  );
};

export default Registration;
