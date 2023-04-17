import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { AiOutlineEye } from "react-icons/ai";
import { showError, showSucess } from "../helper/heper";
import { httpGet, httpPost } from "../Action";

const SignUp = () => {
  const [allDepartment, setAllDepartment] = useState([])
  const [allDesignation, setAllDesignation] = useState([])
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    department: "",
    designation: "",
  });

  useEffect(() => {
    getDeprtments()
  },[])

  useEffect(() => {
    if(formData.department){
     getDesignation()
    }
  },[formData.department])

  const getDeprtments = async()=> {
   const department = await httpGet('department/')
   console.log('daqta',department.data);
   setAllDepartment(department.data);
  }

  const getDesignation = async()=> {
    const department = await httpGet(`designation/${formData.department}`)
    console.log('daqta',department.data);
    setAllDesignation(department.data);
   }
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log('weq', formData);
  };

  const submit = async (e) => {
    e.preventDefault();

    const response = await httpPost("user/sign/up", formData);
    if (response.status == "400") {
      console.log('err');
      showError(response.message);
    } else {
      showSucess(response.message);
      console.log("res", response.data);
    }
  };

  return (
    <>
      <div className="title-bar">
        <h2>Request Access</h2>
        <p>Raise a request for access</p>
      </div>
      <div className="form">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Requester’s Name"  onChange={(e) =>onChange(e)} name='name' />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email ID</Form.Label>
            <Form.Control type="email" placeholder="Requester’s Email ID" onChange={(e) =>onChange(e)} name='email'/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Department</Form.Label>
            <Form.Select onChange={(e) =>onChange(e)} name='department'>
            <option>Requester’s Department</option>
            {allDepartment.map((item) => <>
              <option value={item._id}>{item.name}</option>
               </>)}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Designation</Form.Label>
            <Form.Select onChange={(e) =>onChange(e)} name='designation'>
              <option>Requester’s Designation</option>
              {allDesignation.map((item) => <>
              <option value={item._id}>{item.name}</option>
               </>)}
            </Form.Select>
          </Form.Group>

          <Form.Label>Your password</Form.Label>

          <InputGroup className="mb-3">
            <Form.Control type="password" placeholder="Enter your password" onChange={(e) =>onChange(e)} name='password'/>
            <InputGroup.Text id="basic-addon2">
              <AiOutlineEye />
            </InputGroup.Text>
          </InputGroup>

          <Button variant="primary" type="submit" onClick={submit}>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default SignUp;
