import Accordion from "react-bootstrap/Accordion";
import { NavLink } from "react-router-dom";
import { CiLogout } from 'react-icons/ci';

const SideBar = () => {
  return (
    <>
      <div className="sidebar-panel">
      <Accordion defaultActiveKey="Requested-Access">
        <Accordion.Item eventKey="Requested-Access">
          <Accordion.Header>Requested Access</Accordion.Header>
          <Accordion.Body>
            <ul>
              <li>
                {" "}
                <NavLink to="/contract/upload">Contract Upload</NavLink>{" "}
              </li>
              <li>
                {" "}
                <NavLink to="/standard/agreement">Standard Agreement</NavLink>{" "}
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
              <li>
                {" "}
                <NavLink to="/standard/agreement">Standard Agreement</NavLink>{" "}
              </li>
              <li>
                {" "}
                <NavLink to="/">Contract Rollout</NavLink>
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        
        <NavLink to="/approvals">Approvals</NavLink>
        

        <Accordion.Item eventKey="Configuration">
          <Accordion.Header>Configuration</Accordion.Header>
          <Accordion.Body>
            <ul>
              <li>
                <NavLink to="/department"> Department </NavLink>{" "}
              </li>
              <li>
                {" "}
                <NavLink to="/"> Designation </NavLink>{" "}
              </li>
              <li>
                {" "}
                <NavLink to="/"> Contract Type </NavLink>{" "}
              </li>
              <li>
                {" "}
                <NavLink to="/">Contract Sub Type </NavLink>{" "}
              </li>
              
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <NavLink className='logoutbtn' to=""><CiLogout/>Logout</NavLink>
      </div>
    </>

  );
};

export default SideBar;
