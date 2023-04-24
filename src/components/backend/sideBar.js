import Accordion from "react-bootstrap/Accordion";
import { NavLink } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { useContext, useEffect } from "react";
import { AppContext } from "../../helper/context";

const SideBar = () => {
  const { logOut, decodeToken } = useContext(AppContext);
  const onClickLogOut = () => {
    if (window.confirm("Are you want to Log Out ?")) {
      logOut();
    }
  };


  const role = decodeToken()?.role;

    return (
    <>
      <div className="sidebar-panel">
        <Accordion defaultActiveKey="Requested-Access">
          {role == "user" ? (
            <>
              <Accordion.Item eventKey="Requested-Access">
                <Accordion.Header>Requested Access</Accordion.Header>
                <Accordion.Body>
                  <ul>
                    <li>
                      {" "}
                      <NavLink to="/contract/upload">
                        Contract Upload
                      </NavLink>{" "}
                    </li>
                    <li>
                      {" "}
                      <NavLink to="/standard/agreement">
                        Standard Agreement
                      </NavLink>{" "}
                    </li>
                    <li>
                      {" "}
                      <NavLink to="/contractrollout">Contract Rollout</NavLink>
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="All-Contract">
                <Accordion.Header>All Contracts</Accordion.Header>
                <Accordion.Body>
                  <ul>
                    <li>
                      {" "}
                      <NavLink to="/allcontract">All Contracts</NavLink>{" "}
                    </li>
                   
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </>
          ) : (
            <>
              <NavLink to="/approvals">Approvals</NavLink>
              <NavLink to="/approved/user">Approved User</NavLink>

              <Accordion.Item eventKey="Configuration">
                <Accordion.Header>Configuration</Accordion.Header>
                <Accordion.Body>
                  <ul>
                    <li>
                      <NavLink to="/department"> Department </NavLink>{" "}
                    </li>
                    <li>
                      {" "}
                      <NavLink to="/designation"> Designation </NavLink>{" "}
                    </li>
                    <li>
                      {" "}
                      <NavLink to="/contract/type"> Contract Type </NavLink>{" "}
                    </li>
                    <li>
                      {" "}
                      <NavLink to="/sub/contract/type">Contract Sub Type </NavLink>{" "}
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </>
          )}
        </Accordion>
        <NavLink className="logoutbtn" to="" onClick={onClickLogOut}>
          <CiLogout />
          Logout
        </NavLink>
      </div>
    </>
  );
};

export default SideBar;
