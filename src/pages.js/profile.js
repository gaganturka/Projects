import { useEffect, useState } from "react";
import { httpget, httpPut } from "../Action";
import { showError, showSucess } from "../helper.js/helper";



const Profile = () => {
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        const id = localStorage.getItem('id')
        httpget(`user/${id}/profile`)
        .then(function (response) {
          console.log(response);
          if (response.statusCode == 400) {
            showError(response.message);
          } else {
            showSucess(response.message);
            setData(response.data)
         
          }
        })

    },[update])

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

      const submit = () => {
        
        httpPut(`update/user`, data)
        .then(function (response) {
          console.log(response);
          if (response.statusCode == 400) {
            showError(response.message);
          } else {
            showSucess(response.message);
            setData(response.data)
            setUpdate(true)
         
          }
        })

      }
    
      const onChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
      };


  return (
    <>
      <div class="container bootstrap snippets bootdey">
        <div class="row">
          <div class="profile-nav col-md-3">
            <div class="panel">
              <div class="user-heading round">
                <a href="#">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar3.png"
                    alt=""
                  />
                </a>
                <h1>{data?.fname} {data?.lname}</h1>
                <p>{data?.email}</p>
              </div>
            </div>
          </div>
          <div class="profile-info col-md-9">
            <div class="panel">
            

              <div class="panel-info bio-graph-info pt-3 pl-3 pb-3">
                <h1>Bio Graph</h1>
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
            <div className="form-group ">
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
            <div className="form-group ">
              <div className="col-sm-9 col-sm-offset-3"></div>
            </div>
            <button
              type="submit"
              onClick={submit}
              className="btn btn-primary btn-block "
            >
              Update
            </button>
        </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
