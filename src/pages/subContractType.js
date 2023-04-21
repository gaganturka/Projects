import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { httpDelete, httpGet, httpPost, httpPut } from "../Action";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import { showError, showSucess } from "../helper/heper";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";


const ContractType = () => {
  const [designation, setDesignation] = useState([]);
  const [formData, setFormData] = useState({ name: '', parentId : '' })
  const [allContractType, setAllContractType] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let [newDesignation, setNewDesignation] = useState('')
  const [id, setId] = useState('');

  
  useEffect(() => {
    subContractTypes();
    getDeprtments();
  }, []);

  const addNew = () => {
    setId('');
    setFormData({ name: '', parentId : ''});
    handleShow();

  }

  const getDeprtments = async () => {
    const ContractType = await httpGet("contract/type/");
    setAllContractType(ContractType.data);
  };


  const createDesignation = async () => {
    let overAllResponse;
    if (id) {
      const response = await httpPut(`sub/contract/type/${id}`, formData);
      overAllResponse = response
    } else {
      const response = await httpPost(`sub/contract/type/`, formData);
      overAllResponse = response

    }
    handleClose()
    setNewDesignation('')
    if (overAllResponse.status == "400") {
      console.log("err");
      showError(overAllResponse.message);
    } else {
      subContractTypes()
      showSucess(overAllResponse.message);
      console.log("res", overAllResponse.data);
    }
  };

  const subContractTypes = async () => {
    const designation = await httpGet("sub/contract/type/all");
    console.log("daqta", designation.data);
    setDesignation(designation.data);
  };

  const onClick = async (id) => {
    if (window.confirm("Are you want to Delete Sub contract type")) {
      const response = await httpDelete(`sub/contract/type/${id}`);
      if (response.status == "400") {
        showError(response.message);
      } else {
        subContractTypes();
        showSucess(response.message);
      }
    }
  };

  const getDesignation = async (id) => {
    const designation = await httpGet(`sub/contract/type/${id}`);
    
    handleShow()
    console.log("data", designation.data);
    setFormData({ ['name']: designation.data?.name, ['parentId'] : designation.data?.parentId });

console.log('e',formData)
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
                  placeholder="Enter Contract Type"
                  name="name"
                  value={formData.name}
                  onChange={(e) => onChange(e)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>ContractType</Form.Label>
                <Form.Select
                  className="form-control"
                  name="parentId"
                  value={formData.parentId}
                  onChange={(e) => onChange(e)}
                >
                  <option>Select ContractType Type</option>
                  {allContractType.map((item) => (
                    <>
                      <option value={item._id}>{item.name}</option>
                    </>
                  ))}
                </Form.Select>
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
              <th>Name</th>
              <th>CONTRACT TYPE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>

              {designation.map((item) => {
                return (
                  <>
                    <tr>
                    <td>{item?.name}</td>
                    <td>{item?.parentId?.name}</td>
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

export default ContractType;
