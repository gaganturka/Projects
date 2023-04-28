import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { httpDelete, httpGet, httpPost, httpPut } from "../Action";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import { showError, showSucess } from "../helper/heper";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";


const Designation = () => {
  const [designation, setDesignation] = useState([]);
  const [formData, setFormData] = useState({ name: '', departmentId: '', level: '' })
  const [allDepartment, setAllDepartment] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let [newDesignation, setNewDesignation] = useState('')
  const [id, setId] = useState('');
  const levelValues = ([
    { name: 1, value: 1 },
    { name: 2, value: 2 },
    { name: 3, value: 3 },
    { name: 4, value: 4 },
    { name: 5, value: 5 },
  ])

  useEffect(() => {
    getDesignations();
    getDeprtments();
  }, []);

  const addNew = () => {
    setId('');
    setFormData({ name: '', departmentId: '', level: '' });
    handleShow();

  }

  const getDeprtments = async () => {
    const department = await httpGet("department/");
    setAllDepartment(department.data);
  };


  const createDesignation = async () => {
    let overAllResponse;
    if (id) {
      const response = await httpPut(`designation/${id}`, formData);
      overAllResponse = response
    } else {
      const response = await httpPost(`designation/`, formData);
      overAllResponse = response

    }
 
    setNewDesignation('')
    if (overAllResponse.status == "400") {
      console.log("err");
      showError(overAllResponse.message);
    } else {
      handleClose()
      getDesignations()
      showSucess(overAllResponse.message);
      console.log("res", overAllResponse.data);
    }
  };

  const getDesignations = async () => {
    const designation = await httpGet("designation/");
    console.log("daqta", Designation.data);
    setDesignation(designation.data);
  };

  const onClick = async (id) => {
    if (window.confirm("Are you want to Delete Designation")) {
      const response = await httpDelete(`designation/${id}`);
      if (response.status == "400") {
        showError(response.message);
      } else {
        getDesignations();
        showSucess(response.message);
      }
    }
  };

  const getDesignation = async (id) => {
    const designation = await httpGet(`designation/${id}`);
    handleShow()
    console.log("data", designation.data);
    setFormData({ ['name']: designation.data?.name, ['departmentId']: designation.data?.departmentId, ['level']: designation.data?.level });
    // setFormData({...formData,});
    setId(designation.data._id)
  }

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log("weq", formData);
  };


  return (
    <>

      <div className="body-main">
        <div className="title-bar d-flex align-items-center justify-content-between">
          <h2>Designation</h2>
          <Button variant="primary" className="btnblack" onClick={addNew}>
            Add New
          </Button>
        </div>


        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{id ? "Edit" : "Add"} Designation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Designation"
                  name="name"
                  value={formData.name}
                  onChange={(e) => onChange(e)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Department</Form.Label>
                <Form.Select
                  className="form-control"
                  name="departmentId"
                  value={formData.departmentId}
                  onChange={(e) => onChange(e)}
                >
                  <option>Select Department Type</option>
                  {allDepartment.map((item) => (
                    <>
                      <option value={item._id}>{item.name}</option>
                    </>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
              <Form.Control
                  type="number"
                  placeholder="Enter level"
                  name="level"
                  value={formData.level}
                  onChange={(e) => onChange(e)}
                />

              </Form.Group>


            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={createDesignation}>
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
                <th>LEVEL</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>

              {designation.map((item) => {
                return (
                  <>
                    <tr>
                      <td>{item?.name}</td>
                      <td>{item?.departmentId?.name}</td>
                      <td>{item?.level}</td>
                      <td>
                        <AiFillEdit onClick={() => getDesignation(item?._id)} />
                        <RiDeleteBinLine onClick={() => onClick(item?._id)} />
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Designation;
