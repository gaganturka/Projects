import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
// import Home from './pages/about';
import "./App.css";
import "./css/style.css";
import "./fonts/stylesheet.css";
import Auth from "./components/Auth/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Backend from "./components/backend/index";
import Authentication from "./components/Authentication/index";
import Contract from "./pages/contract";
import StandardAgreement from "./pages/standardAgreement";
import ContractRollout from "./pages/contractRollout";
import Approvals from "./pages/approvals";
import Department from "./pages/department";
import Designation from "./pages/designation";
import AllContract from "./pages/AllContract";
import ForgetPassword from "./pages/forgetPassword";
import { AppContext } from "./helper/context";

function App() {
  const {token} = useContext(AppContext);
  
  return (
    <>
      <div>
      <ToastContainer />
      { token ? <> 
      <Routes>
          <Route  element={<Backend />} >
          <Route path="/approvals" element={<Approvals />} />
          <Route path="/*" element={<Contract />} />
          <Route path="/department" element={<Department />} />
          <Route path="/designation" element={<Designation />} />
          <Route path="/contract/upload" element={<Contract />} />
          <Route path="/allcontract" element={<AllContract />} />
          <Route path="/contractrollout" element={<ContractRollout />} />
          <Route path="/standard/agreement" element={<StandardAgreement />} />
          </Route>
        </Routes>

      </> : <> 
      <Routes   element={<Authentication />} >
          <Route path="/" element={<Auth />} />
          <Route path="/*" element={<Auth />} />

          <Route path="/forget/password" element={<ForgetPassword />} />

        </Routes>

      </>}
    

      </div>
    </>
  );
}

export default App;
