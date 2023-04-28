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
import ViewContract from "./pages/viewContract";
import EmailExtractor from "./pages/read";
import ContractType from "./pages/contractType";
import SubContractType from "./pages/subContractType";
import ApprovedUser from "./pages/approvedUser";
import { TailSpin } from 'react-loader-spinner'

function App() {
  const { token, decodeToken } = useContext(AppContext);
  const role = decodeToken()?.role;
  return (
    <>
     <div className="custm-loader d-none" id="mainLoaderElement">
    <TailSpin  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="circles-loading"
  wrapperStyle={{}}  
  wrapperClass=""
  visible={true} />
  </div>
      <div>
        <ToastContainer />
        {token ? (
          <>
            {role == "user" ? (
              <>
                <Routes>
                  <Route element={<Backend />}>
                    <Route path="/*" element={<Contract />} />
                    <Route path="/approvals" element={<Approvals />} />
                    <Route path="/contract/upload" element={<Contract />} />
                    <Route path="/allcontract" element={<AllContract />} />
                    <Route path="/viewcontract/:id" element={<ViewContract />} />
                    <Route
                      path="/contractrollout"
                      element={<ContractRollout />}
                    />
                    <Route
                      path="/standard/agreement"
                      element={<StandardAgreement />}
                    />
                  </Route>
                </Routes>
              </>
            ) : (
              <>
                <Routes>
                  <Route element={<Backend />}>
                    <Route path="/approvals" element={<Approvals />} />
                    <Route path="/viewcontract/:id" element={<ViewContract />} />
                    <Route path="/*" element={<Approvals />} />
                    <Route path="/allcontract" element={<AllContract />} />
                    <Route path="/department" element={<Department />} />
                    <Route path="/designation" element={<Designation />} />
                    <Route path="/contract/type" element={<ContractType />} />
                    <Route path="/sub/contract/type" element={<SubContractType />} />
                    <Route path="/approved/user" element={<ApprovedUser />} />
                  </Route>
                </Routes>
              </>
            )}
          </>
        ) : (
          <>
            <Routes element={<Authentication />}>
              <Route path="/" element={<Auth />} />
              <Route path="/*" element={<Auth />} />

              <Route path="/forget/password" element={<ForgetPassword />} />
            </Routes>
          </>
        )}
      </div>
    </>
  );
}

export default App;
