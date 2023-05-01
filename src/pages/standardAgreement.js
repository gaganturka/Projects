import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { showError, showSucess } from "../helper/heper";
import { httpGet, httpPost } from "../Action";
import { Row, Col } from "react-bootstrap";

const StandardAgreement = () => {
  const [allDepartment, setAllDepartment] = useState([]);
  const [allDesignation, setAllDesignation] = useState([]);
  const [formData, setFormData] = useState({
    contractType: "",
    secondPartyName: "",
    signatoryMailId: "",
    department: "",
    designation: "",
  });

  useEffect(() => {
    getDeprtments();
  }, []);

  useEffect(() => {
    if (formData.department) {
      getDesignation();
    }
  });


  const getDeprtments = async()=> {
    const department = await httpGet('department/')
    console.log('daqta',department.data);
    setAllDepartment(department.data);
   }

  const getDesignation = async () => {
    const department = await httpGet(
      `designation/department/${formData.department}`
    );
    console.log("daqta", department.data);
    setAllDesignation(department.data);
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log("weq", formData);
  };

  const submit = async (e) => {
    e.preventDefault();

    const response = await httpPost("user/sign/up", formData);
    if (response.status == "400") {
      console.log("err");
      showError(response.message);
    } else {
      showSucess(response.message);
      console.log("res", response.data);
    }
  };

  return (
    <>
      <diV className="title-bar">
        <h2>Standard Agreement</h2>
      </diV>

      <div className="form">
        <Row>
          <Col md={6}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Type of Contract</Form.Label>
                <Form.Select className="form-control" name="department">
                  <option>Select Contract Type</option>
                  {/* {allDepartment.map((item) => <>
              <option value={item._id}>{item.name}</option>
               </>)} */}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name of Second Party (Legal Name)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name of Second Party"
                  name="name"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>XYXX Required Signatory Mail ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Signatory Email ID"
                  name="name"
                />
              </Form.Group>
            </Form>
          </Col>
          <Col md={6}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Select XYXX Entity and Address</Form.Label>
                <Form.Select className="form-control" name="department">
                  <option>Enter Address</option>
                  {/* {allDepartment.map((item) => <>
              <option value={item._id}>{item.name}</option>
               </>)} */}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Address of Second Party - Pan & GST</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Address of Second Party"
                  name="name"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>
                  Customer/Vendor Required Signatory Mail ID
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Vendor Signatory Email ID"
                  name="name"
                />
              </Form.Group>

              <div class="btngroups">
                {/* <Button className="btnblack" type="submit" onClick={"submit"}>
                  Preview
                </Button> */}
                <Button className="btnblack" type="submit" onClick={"submit"}>
                  Submit
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default StandardAgreement;
