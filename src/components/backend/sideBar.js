import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <>
      <Accordion defaultActiveKey="Requested-Access">
        <Accordion.Item eventKey="Requested-Access">
          <Accordion.Header>Requested Access</Accordion.Header>
          <Accordion.Body>
            <ul>
              <li>
                {" "}
                <Link to="/contract/upload">Contract Upload</Link>{" "}
              </li>
              <li>
                {" "}
                <Link to="/standard/agreement">Standard Agreement</Link>{" "}
              </li>
              <li>
                {" "}
                <Link to="/">Contract Rollout</Link>
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
                <Link to="/contract/upload">Contract Upload</Link>{" "}
              </li>
              <li>
                {" "}
                <Link to="/standard/agreement">Standard Agreement</Link>{" "}
              </li>
              <li>
                {" "}
                <Link to="/">Contract Rollout</Link>
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        
          <Link to="/approvals">Approvals</Link>
        

        <Accordion.Item eventKey="Configuration">
          <Accordion.Header>Configuration</Accordion.Header>
          <Accordion.Body>
            <ul>
              <li>
                <Link to="/department"> Department </Link>{" "}
              </li>
              <li>
                {" "}
                <Link to="/designation"> Designation </Link>{" "}
              </li>
              <li>
                {" "}
                <Link to="/"> Contract Type </Link>{" "}
              </li>
              <li>
                {" "}
                <Link to="/">Contract Sub Type </Link>{" "}
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default SideBar;
