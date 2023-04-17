import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { RiDeleteBin5Line } from "react-icons/ri";

const ContractRollout = () => {
  return (
    <>
      <div clsassName="form">
        <Row>
          <Col xs="7">
            <div className="title-bar">
              <h2>Contract Rollout</h2>
            </div>
            <div className="d-flex align-items-center forminputs-bar">
              <Form.Check
                className="cursor-pointer"
                type="radio"
                label="New Email Broadcast"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
              />
              <Form.Check
                className="cursor-pointer"
                type="radio"
                label="Reminder Email"
                name="formHorizontalRadios"
                id="formHorizontalRadios2"
              />
            </div>

            <div className="form">
              <Form>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the intent of the mail"
                    name="name"
                  />
                </Form.Group>
                <Form.Label>Emails</Form.Label>
                <InputGroup className="mb-3 uploademails">
                  <Form.Control
                    placeholder="Enter emails "
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
                  <InputGroup.Text id="basic-addon2">Upload</InputGroup.Text>
                </InputGroup>

                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Emails</Form.Label>
                  <Form.Control
                    as="textarea"
                    type="text"
                    placeholder="Enter emails"
                    name="name"
                  />
                </Form.Group>

                <Row>
                  <Col className="uploadbar">
                    <Form.Label>Upload Document</Form.Label>
                    <Form.Control
                      type="file"
                      placeholder="Customer/Vendor Name"
                      name="CustomerName"
                    />
                  </Col>
                </Row>

                <div class="btngroups">
                  <Button className="btnblack" type="submit" onClick={"submit"}>
                    Preview
                  </Button>
                  <Button className="btnblack" type="submit" onClick={"submit"}>
                    Submit
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
          <Col>
            <div className="emailadded-bar">
              <div className="title-bar">
                <h3>Email Added</h3>
              </div>
              <ul className="emaillisting mb-0 p-0 ">
                <li className='d-flex align-items-center justify-content-between pb-2 mb-2'>
                  <p className="mb-0">xyz@email.com</p>
                  <button className="del-btn">
                    <RiDeleteBin5Line/>
                  </button>
                </li>
                <li className='d-flex align-items-center justify-content-between pb-2 mb-2'>
                  <p className="mb-0">xyz@email.com</p>
                  <button className="del-btn">
                    <RiDeleteBin5Line/>
                  </button>
                </li>
                <li className='d-flex align-items-center justify-content-between pb-2 mb-2'>
                  <p className="mb-0">xyz@email.com</p>
                  <button className="del-btn">
                    <RiDeleteBin5Line/>
                  </button>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default ContractRollout;
