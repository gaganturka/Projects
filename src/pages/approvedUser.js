import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { httpGet, httpPost, httpPut } from "../Action";
import { showError, showSucess, showLoading, formateDate } from "../helper/heper";
import moment from "moment";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { AiOutlinePlus } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";


const ApprovedUser = () => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [id, setId] = useState("");
  const [allDepartment, setAllDepartment] = useState([])
  const [allDesignation, setAllDesignation] = useState([])
  const [isActiveUser, setIsActiveUser] = useState()
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    department: "",
    designation: "",
    
  });


  useEffect(() => {
    getDeprtments()
  },[])
useEffect(() => {},[formData])
  useEffect(() => {
    if(formData.department){
     getDesignation()
    }
  },[formData.department])

  const getUser = async (id) => {
    console.log('dsdsads', id);
    const department = await httpGet(`user/${id}`);
    handleShow();
    console.log("data", department.data);
    setFormData(prevState => ({
      ...prevState,
      name: department?.data?.name,
      email: department?.data?.email,
      department: department?.data?.department?._id,
      designation: department?.data?.designation?._id,
   
    }));
    setId(department.data._id);
    setIsActiveUser(department?.data?.isActive)
  };

  const getDeprtments = async()=> {
   const department = await httpGet('department/')
   console.log('daqta',department.data);
   setAllDepartment(department.data);
  }

  const getDesignation = async()=> {
    const department = await httpGet(`designation/department/${formData?.department}`)
    console.log('daqta',department.data);
    setAllDesignation(department.data);
   }

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
   
  };



  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = async () => {
    const usersData = await httpGet("user/approved");
    console.log("efdfef", usersData);
    setUsers(usersData.data);
  };

  const isActive = async (value, id) => {
  const data = {'value' : value ,'_id' : id}
    const usersData = await httpPost("user/isActive", data);
   if(usersData.status == 200){
    getUsers()
   }
  };

  const submit = async (e) => {
    e.preventDefault();
    formData['isActive'] =  isActiveUser;
    formData['_id'] =  id;
        const response = await httpPut(`user/${id}`, formData);
    if (response.status == "400") {
      console.log('err');
      showError(response.message);
    } else {
      showSucess(response.message);
      getUsers();
      // navigate('/log-in')
      handleClose()
      console.log("res", response.data);
    }
  };


  return (
    <>
      <div className="body-main">
        <div className="title-bar d-flex align-items-center justify-content-between">
          <h2>APPROVED USER</h2>
        </div>
       
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{id ? 'Edit' : 'Add'} Department</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Requester’s Name"value={formData.name}  onChange={(e) =>onChange(e)} name='name' />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email ID</Form.Label>
            <Form.Control type="email" placeholder="Requester’s Email ID" value={formData.email} onChange={(e) =>onChange(e)} name='email'/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Department</Form.Label>
            <Form.Select onChange={(e) =>onChange(e)} name='department' value={formData.department}>
            <option value="">Requester’s Department</option>
            {allDepartment.map((item) => <>
              <option value={item._id}>{item.name}</option>
               </>)}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Designation</Form.Label>
            <Form.Select onChange={(e) =>onChange(e)} name='designation' value={formData.designation}>
              <option value="">Requester’s Designation</option>
              {allDesignation.map((item) => <>
              <option value={item._id}>{item.name}</option>
               </>)}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3 " controlId="formBasicEmail">
            <Form.Label>Is Active User</Form.Label>
            {/* <Form.Control type="checkbox"  role="switch" classsName="form-check form-switch form-check-input"
                            id="flexSwitchCheckDefault" placeholder="Requester’s Email ID"  onChange={(e) =>onChange(e)} name='email'/> */}
                            <div class="form-check form-switch">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                          defaultChecked={isActiveUser}
                            onChange={(e) =>setIsActiveUser(e.target.checked)} name='isActive'
                          
                            // onClick={(e) => isActive(e.target.checked, id )}
                          /></div>
          </Form.Group>

          {/* <div class="form-check form-switch">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                            checked={item.isActive}
                          
                            onClick={(e) => isActive(e.target.checked,item._id )}
                          /> */}
 

        </Form>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={submit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="table-bar">
          <Table>
            <thead>
              <tr>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>DEPARTMENT</th>
                <th>DESIGNATION</th>
                <th>Is Active User</th>
                <th>APPROVED AT</th>
                <th>Active</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item) => {
                return (
                  <>
                    <tr>
                      <td>{item?.name}</td>
                      <td>{item?.email}</td>
                      <td>{item?.department?.name}</td>
                      <td>{item?.designation?.name}</td>
                      <td>{item?.isActive ? 'Yes' : 'No'}</td>
                      <td>{formateDate(item?.approvedAt)}</td>
                      <td>
                      <AiFillEdit onClick={() =>getUser(item?._id)} />
                       
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

export default ApprovedUser;
