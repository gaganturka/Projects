import Header from "./Header";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Login from "../../pages/login";
import SignUp from "../../pages/signUp";
const Auth = () => {
  return (
    <>
      <Header />
      <div className="main-wraper">
        <div className="body-wraper">
          <div className="logo">
            <img src="/images/logoblack.png" alt="logo.white" />
          </div>
          <div className="form-tabs">
            <Tabs
              defaultActiveKey="login"
              id="uncontrolled-tab-example"
            >
              <Tab eventKey="login" title="Sign In">
                <Login />
              </Tab>
              <Tab eventKey="signup" title="Raise request access">
                <SignUp />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
