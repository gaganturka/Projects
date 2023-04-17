import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

const ContractRollout = () => {
  return (
    <>
      <div clsassName="form">
        <Row>
          <Col xs="7">
            <div className="title-bar">
              <h2>Contract Rollout</h2>
            </div>

            <Row sm={10}>
            <Form.Check
              type="radio"
              label="New Email Broadcast"
              name="formHorizontalRadios"
              id="formHorizontalRadios1"
            />
            <Form.Check
              type="radio"
              label="Reminder Email"
              name="formHorizontalRadios"
              id="formHorizontalRadios2"
            />
           
          </Row>
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

                <InputGroup className="mb-3">
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
                    type="text"
                    placeholder="Enter emails"
                    name="name"
                  />
                </Form.Group>

                <Row>
                <Col>
                  <Form.Label>Upload Document</Form.Label>
                  <Form.Control
                    type="file"
                    placeholder="Customer/Vendor Name"
                    name="CustomerName"
                  />
                </Col>
              </Row>

              <div class="burrons">
              <Button variant="primary" type="submit" onClick={"submit"}>
                Preview
              </Button>
              <Button variant="primary" type="submit" onClick={"submit"}>
                Submit
              </Button>
              </div>



              </Form>
            </div>
          </Col>
          <Col>
          <div className="title-bar">
            <h3>Email Added</h3>
          </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default ContractRollout;
