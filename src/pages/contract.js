import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { showError, showSucess } from "../helper/heper";
import { httpGet, httpPost } from "../Action";
import { Row, Col } from "react-bootstrap";
import { AppContext } from "../helper/context";

const Contract = () => {
  const {  decodeToken } = useContext(AppContext);
  const userId = decodeToken()?.userId;
  

  const [allDepartment, setAllDepartment] = useState([]);
  const [allContractsType, setAllContractsType] = useState([]);
  const [allSubContractsType, setAllSubContractsType] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    customerName: "",
    type: "",
    startDate: "",
    endDate: "",
    reminderDate: "",
    reminderFrequency: "",
    email: "",
    customerEmail: "",
    subContractType: "",
    spocName: "",
    department: "",
  });

  const [file, setFile] = useState("");

  const [frequency, setFrequency] = useState([
    { name: "1 week", value: "7" },
    { name: "1 month", value: "30" },
  ]);

  useEffect(() => {
    getDeprtments();
    getContracts();
  }, []);

  useEffect(() => {
    if (formData.type) {
      getSubContracts();
    }
  }, [formData.type]);

  const getDeprtments = async () => {
    const department = await httpGet("department/");
    console.log("daqta", department.data);
    setAllDepartment(department.data);
  };

  const getContracts = async () => {
    const department = await httpGet("contract/type/");
    console.log("daqta", department.data);
    setAllContractsType(department.data);
  };

  const getSubContracts = async () => {
    const department = await httpGet(`sub/contract/type/department/${formData.type}`);
    console.log("daqta", department.data);
    setAllSubContractsType(department.data);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log("weq", formData);
  };

  const submit = async (e) => {
    e.preventDefault();
    const newFormData = new FormData();
    newFormData.append("name", formData.name);
    newFormData.append("customerName", formData.customerName);
    newFormData.append("type", formData.type);
    newFormData.append("startDate", formData.startDate);
    newFormData.append("endDate", formData.endDate);
    newFormData.append("reminderDate", formData.reminderDate);
    newFormData.append("reminderFrequency", formData.reminderFrequency);
    newFormData.append("email", formData.email);
    newFormData.append("customerEmail", formData.customerEmail);
    newFormData.append("subContractType", formData.subContractType);
    newFormData.append("spocName", formData.spocName);
    newFormData.append("department", formData.department);
    newFormData.append("image", file);
    newFormData.append("userId", userId);

    const response = await httpPost("contract/", newFormData);
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
      <div className="body-main">
        <div className="title-bar">
          <h2> Contract Upload</h2>
        </div>

        <div className="main-form">
          <Row>
            <Col>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Requester’s Name"
                    name="name"
                    onChange={(e) => onChange(e)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Customer/Vendor Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Customer/Vendor Name"
                    name="customerName"
                    onChange={(e) => onChange(e)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Type of Contract</Form.Label>
                  <Form.Select
                    className="form-control"
                    name="type"
                    onChange={(e) => onChange(e)}
                  >
                    <option>Select Contract Type</option>
                    {allContractsType.map((item) => (
                      <>
                        <option value={item._id}>{item.name}</option>
                      </>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Contract Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Enter Start Date"
                    name="startDate"
                    onChange={(e) => onChange(e)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Contract Renewal Reminder Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Enter Reminder Date"
                    name="reminderDate"
                    onChange={(e) => onChange(e)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Contract Renewal Reminder Frequency</Form.Label>
                  <Form.Select
                    className="form-control"
                    name="reminderFrequency"
                    onChange={(e) => onChange(e)}
                  >
                    <option>Select Reminder Frequency</option>
                    {frequency.map((item) => (
                      <>
                        <option value={item.value}>{item.name}</option>
                      </>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Form>
            </Col>
            <Col>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email ID</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Requester’s Email ID"
                    name="email"
                    onChange={(e) => onChange(e)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Customer/Vendor Email ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Customer/Vendor Email ID"
                    name="customerEmail"
                    onChange={(e) => onChange(e)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Type of Sub Contract</Form.Label>
                  <Form.Select
                    className="form-control"
                    name="subContractType"
                    onChange={(e) => onChange(e)}
                  >
                    <option>Select Sub Contract Type</option>
                    {allSubContractsType.map((item) => (
                      <>
                        <option value={item._id}>{item.name}</option>
                      </>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Contract End Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Enter End Date"
                    name="endDate"
                    onChange={(e) => onChange(e)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>
                    Customer/Vendor SPOC Name - Authorise Signatory{" "}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter..."
                    name="spocName"
                    onChange={(e) => onChange(e)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Department</Form.Label>
                  <Form.Select
                    className="form-control"
                    name="department"
                    onChange={(e) => onChange(e)}
                  >
                    <option>Select Contract Type</option>
                    {allDepartment.map((item) => (
                      <>
                        <option value={item._id}>{item.name}</option>
                      </>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="uploadbar">
                <Form.Label>Upload Document</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Customer/Vendor Name"
                  name="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </Col>
            <Col>
                <div className="btnupload">
                <Button className="btnblack" type="submit" onClick={submit}>
                Submit
              </Button>
                </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};
export default Contract;
