import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { httpDelete, httpGet, httpPost, httpPut } from "../Action";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import { showError, showSucess } from "../helper/heper";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";


const ContractType = () => {
  const [ContractType, setContractType] = useState([]);
  const [formData, setFormData] = useState({ name: '' })
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let [newContractType, setNewContractType] = useState('')
  const [id, setId] = useState('');

  useEffect(() => {
    getContractTypes();
  }, []);

  const addNew = () => {
    setId('');
    setFormData({ name: ''});
    handleShow();

  }

 


  const createContractType = async () => {
    let overAllResponse;
    if (id) {
      const response = await httpPut(`contract/type/${id}`, formData);
      overAllResponse = response
    } else {
      const response = await httpPost(`contract/type/`, formData);
      overAllResponse = response

    }
 
    setNewContractType('')
    if (overAllResponse.status == "400") {
      console.log("err");
      showError(overAllResponse.message);
    } else {
      handleClose()
      getContractTypes()
      showSucess(overAllResponse.message);
      console.log("res", overAllResponse.data);
    }
  };

  const getContractTypes = async () => {
    const ContractType = await httpGet("contract/type/");
    console.log("daqta", ContractType.data);
    setContractType(ContractType.data);
  };

  const onClick = async (id) => {
    if (window.confirm("Are you want to Delete ContractType")) {
      const response = await httpDelete(`contract/type/${id}`);
      if (response.status == "400") {
        showError(response.message);
      } else {
        getContractTypes();
        showSucess(response.message);
      }
    }
  };

  const getContractType = async (id) => {
    const ContractType = await httpGet(`contract/type/${id}`);

    handleShow()
    console.log("data", ContractType.data);
    setFormData({ ['name']: ContractType.data?.name });
    // setFormData({...formData,});
    setId(ContractType.data._id)
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
          <h2>Contract Type</h2>
          <Button variant="primary" className="btnblack" onClick={addNew}>
          <AiOutlinePlus />
            Add New
          </Button>
        </div>


        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{id ? "Edit" : "Add"} ContractType</Modal.Title>
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


           

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={createContractType}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>


        <div className="table-bar">
          <Table responsive>
            <thead>
              <tr>
                <th>NAME</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>

              {ContractType.map((item) => {
                return (
                  <>
                    <tr>
                      <td>{item?.name}</td>
                      <td>
                        <AiFillEdit onClick={() => getContractType(item?._id)} />
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
