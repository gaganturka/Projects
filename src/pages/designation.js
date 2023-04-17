import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { httpDelete, httpGet, httpPost, httpPut } from "../Action";
import { RiDeleteBinLine } from "react-icons/ri";
import {AiFillEdit}  from "react-icons/ai";
import { showError, showSucess } from "../helper/heper";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";


const Designation = () => {
  const [department, setDepartment] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () =>setShow(true);
  let [newDepartment, setNewDepartment] = useState('')
  const [id, setId] =useState('')

  useEffect(() => {
    getDepartments();
  }, []);

  const addNew = () => {
    setId('');
    setNewDepartment('');
    handleShow();

  }

  const createDepartment = async () => {
    let overAllResponse ;
    if(id){
    const response = await httpPut(`department/${id}`, {'name' : newDepartment});
    overAllResponse = response
    } else{
        const response = await httpPost(`department/`, {'name' : newDepartment});
        overAllResponse = response

    }
    handleClose()
    setNewDepartment('')
    if (overAllResponse.status == "400") {
      console.log("err");
      showError(overAllResponse.message);
    } else {
        getDepartments()
      showSucess(overAllResponse.message);
      console.log("res", overAllResponse.data);
    }
  };

  const getDepartments = async () => {
    const department = await httpGet("department/");
    console.log("daqta", department.data);
    setDepartment(department.data);
  };

  const onClick = async (id) => {
    if (window.confirm("Are you want to Delete Department")) {
      const response = await httpDelete(`department/${id}`);
      if (response.status == "400") {
        showError(response.message);
      } else {
        getDepartments();
        showSucess(response.message);
      }
    }
  };

  const getDepartment =async (id) => {
    const department = await httpGet(`department/${id}`);
    handleShow()
    console.log("data", department.data);
    setNewDepartment(department.data.name);
    setId(department.data._id)
  }

  return (
    <>
      <div className="title-bar">
        <h2>Department</h2>
        <Button variant="primary" onClick={addNew}>
        Add New 
      </Button>
      </div>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Department"
                  name="name"
                  value={newDepartment}
                  onChange={(e) => setNewDepartment(e.target.value)}
                />
              </Form.Group>
              </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={createDepartment}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


      <div className="table-bar">
        <Table >
          <thead>
            <tr>
            <th>DESIGNATION</th>
            <th>DEPARTMENT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            
            {department.map((item) => {
              return (
                <>
                  <tr>
                    <td>{item?.name}</td>
                    <td>
                        <AiFillEdit onClick={() => getDepartment(item?._id)}/>
                      <RiDeleteBinLine onClick={() => onClick(item?._id)} />
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Designation;
