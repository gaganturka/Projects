import React, { useState } from "react";
import firebase from "firebase";
import { httpPost } from "../Action";
import { showError, showSucess } from "../helper.js/helper";
import { auth } from "../helper.js/firebase";
import { Link } from "react-router-dom";


const Login = () => {
  // Inputs
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    httpPost("login", data)
      .then( (response) => {
        if (response.statusCode == 400) {
          showError(response.message);
        } else {
          showSucess(response.message);
          localStorage.setItem('token',response.data.Token )
          localStorage.setItem('id', response.data.userId)
        }

      }).catch( (error) =>{
        console.log(error);
      });
  };

  const onChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="container">
        <form className="form-horizontal" role="form">
          <h2>Log-In</h2>

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
            <div className="col-sm-9 col-sm-offset-3"></div>
          </div>
          <button
            type="submit"
            onClick={submit}
            className="btn btn-primary btn-block"
          >
            Sign In
          </button>
          <div className="text-center">
              <Link to="/register">Sign Up</Link>
            </div>
        </form>
       

        
      </div>
    </>
  )
};

export default Login;
