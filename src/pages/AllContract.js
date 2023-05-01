import Table from "react-bootstrap/Table";
import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { AiOutlineSetting, AiOutlineCheck } from "react-icons/ai";
import { BsFilter } from "react-icons/bs";
import Form from "react-bootstrap/Form";
import { httpGet } from "../Action";
import moment from "moment";
import Button from "react-bootstrap/Button";
import ViewContract from "./viewContract";
import { useNavigate } from "react-router-dom";
import { formateDate } from "../helper/heper";


const AllContract = () => {
  const [allContract, setAllContract] = useState([]);
  // const [allDepartment, setAllDepartment] = useState([]);
  const [allContractsType, setAllContractsType] = useState([]);
  const [formData, setFormData] = useState({
    type: "",
    // department: "",
    startDate: "",
    endDate: "",
  });
  const navigate = useNavigate() 

  const [tableFields, setTableFields] = useState(['name', 'customerName', 'Type', 'endDate']);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log("weq", formData);
  };

  useEffect(() => {
    getDesignations()
    // contractEmail()
  }, [formData]);

  useEffect(() => {
    getContracts();
 
    // getDeprtments();
  }, []);

  const getDesignations = async (e) => {
    e?.preventDefault();
    const contract = await httpGet(
      `contract/?type=${formData?.type}&startDate=${formData?.startDate}&endDate=${formData?.endDate}`
    );
    console.log("daqta", contract.data);
    setAllContract(contract.data);
  };

  const contractEmail = async () => {
    const department = await httpGet("contract/email");
    console.log("daqta", department.data);
  };

  // const getDeprtments = async () => {
  //   const department = await httpGet("department/");
  //   console.log("daqta", department.data);
  //   setAllDepartment(department.data);
  // };

  const getContracts = async () => {
    const department = await httpGet("contract/type/");
    console.log("daqta", department.data);
    setAllContractsType(department.data);
  };

  const addFieldInArray = (field) => {
    let tableFieldsTemp = [...tableFields];
    // console.log('inc', tableFieldsTemp.includes(field));
    if(tableFieldsTemp.includes(field)){
      const index = tableFieldsTemp.indexOf(field);
      const x = tableFieldsTemp.splice(index, 1);
      console.log('yes', tableFieldsTemp);
    }else{
      tableFieldsTemp.push(field)
      console.log('no', tableFieldsTemp);
    }
    setTableFields(tableFieldsTemp);
  }

  const ViewContract = (e) => {
    navigate(`/viewcontract/${e}`)

  }
  return (
    <>
      <div className="body-main">
        <div className="title-bar dropdown-flexing">
          <h2>All Contracts</h2>
          <ul className="dropdown-listing-bar">
            <li>        
{/* 
              <Dropdown>
                <Dropdown.Toggle
                  className="custom-dropbar icondropdown"
                  id="dropdown-basic"
                >
                  <BsFilter />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <h6>FILTER</h6>
                  <Form >
              <Form.Select aria-label="Default select example"
                         className="form-control"
                         name="type"
                         onChange={(e) => onChange(e)}>
                      <option value=''>Select Contract Type</option>
                    {allContractsType.map((item) => (
                      <>
                        <option value={item._id}>{item.name}</option>
                      </>
                    ))}
                      </Form.Select>
              <Form.Select aria-label="Default select example"
                         className="form-control"
                         name="department"
                         onChange={(e) => onChange(e)}>
                        <option>Select Department</option>
                        {allDepartment.map((item) => (
                      <>
                        <option value={item._id}>{item.name}</option>
                      </>
                    ))}
                      </Form.Select>
              <Form.Control type='date' placeholder="Enter Start Date"    className="form-control"
                    name="startDate"
                    onChange={(e) => onChange(e)}/>
              <Form.Control type='date' placeholder="Enter End Date"    className="form-control"
                    name="endDate"
                    onChange={(e) => onChange(e)} />
              <button className="btnblack" type='submit' onClick={getDesignations} >Filter</button>
                  </Form>
                </Dropdown.Menu>
              </Dropdown> */}
            </li>
            <li>
              <Form.Select
                aria-label="Default select example"
                className="form-control"
                name="type"
                onChange={(e) => onChange(e)}
              >
                <option value="">Select Contract Type</option>
                {allContractsType.map((item) => (
                  <>
                    <option value={item._id}>{item.name}</option>
                  </>
                ))}
              </Form.Select>
            </li>
            {/* <li>
              <Form.Select
                aria-label="Default select example"
                className="form-control"
                name="department"
                onChange={(e) => onChange(e)}
              >
                <option>Select Department</option>
                {allDepartment.map((item) => (
                  <>
                    <option value={item._id}>{item.name}</option>
                  </>
                ))}
              </Form.Select>
            </li> */}
            <li>
              <Form.Control
                type="date"
                placeholder="Enter Start Date"
                className="form-control"
                name="startDate"
                onChange={(e) => onChange(e)}
              />
            </li>
            <li>
              <Form.Control
                type="date"
                placeholder="Enter End Date"
                className="form-control"
                name="endDate"
                onChange={(e) => onChange(e)}
              />
            </li>
            <li>
              <Dropdown>
                <Dropdown.Toggle
                  className="custom-dropbar icondropdown"
                  id="dropdown-basic"
                >
                  <AiOutlineSetting />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <h6>FILTER FIELDS</h6>
                  <ul>
                    <li>
                      <button onClick={() =>addFieldInArray('name')}>
                        Name
                       
                        {tableFields.includes('name') ? <AiOutlineCheck /> : ''}
                        
                      </button>
                    </li>
                    <li>
                      <button onClick={() =>addFieldInArray('customerName')}>
                        Customer/Vendor Name
                        {tableFields.includes('customerName') ? <AiOutlineCheck /> : ''}
                      </button>
                    </li>
                    <li>
                    <button onClick={() =>addFieldInArray('Type')}>
                        Type of Contract
                        {tableFields.includes('Type') ? <AiOutlineCheck /> : ''}
                      </button>
                    </li>
                    <li>
                    <button onClick={() =>addFieldInArray('endDate')}>
                        Contract End Date
                        {tableFields.includes('endDate') ? <AiOutlineCheck /> : ''}
                      </button>
                    </li>
                    <li>
                      <button  onClick={() =>addFieldInArray('email')}>
                        Email
                      {tableFields.includes('email') ? <AiOutlineCheck /> : ''}
                      </button>
                    </li>
                    <li>
                      <button onClick={() =>addFieldInArray('customerEmail')}>
                      Customer/Vendor Email
                      {tableFields.includes('customerEmail') ? <AiOutlineCheck /> : ''}</button>
                    </li>
                    <li>
                      <button onClick={() =>addFieldInArray('department')}>
                        Department
                      {tableFields.includes('department') ? <AiOutlineCheck /> : ''}
                      </button>
                    </li>
                  </ul>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
        <div className="table-bar">
          <Table responsive>
            <thead>
              <tr>
              {tableFields.includes('name') ?  <th>NAME</th>     : ''}
              {tableFields.includes('customerName') ?    <th>CUSTOMER/VENDOR NAME</th>    : ''}
              {tableFields.includes('Type') ?    <th>TYPE OF CONTRACT</th>  : ''}
              {tableFields.includes('endDate') ? <th>CONTRACT END DATE</th>   : ''}
              {tableFields.includes('email') ? <th>EMAIL</th>   : ''}
              {tableFields.includes('customerEmail') ? <th>CUSTOMER/VENDOR EMAIL</th>   : ''}
              {tableFields.includes('department') ? <th>DEPARTMENT</th>   : ''}
              {   tableFields.length > 0 ?  <th>ACTION</th> : '' }
              </tr>
            </thead>
            <tbody>
              {allContract.map((item) => (
                <tr>
                    {tableFields.includes('name') ?  <td>{item.name}</td>    : ''}
                    {tableFields.includes('customerName') ?  <td>{item.customerName}</td>    : ''}
                    {tableFields.includes('Type') ?    <td>{item?.type?.name}</td>   : ''}
                    {tableFields.includes('endDate') ?    <td>{formateDate(item.endDate)}</td>    : ''}
                    {tableFields.includes('email') ?    <td>  { item.email}  </td>    : ''}
                    {tableFields.includes('customerEmail') ?    <td>  {item.customerEmail}   </td>    : ''}
                    {tableFields.includes('department') ?    <td>  {item.department?.name}   </td>    : ''}
                    {      tableFields.length > 0 ?     
                    <> <td>
                      <div className="">
                <Button className="btnblack" type="submit" onClick={() => {ViewContract(item._id)}}>View Contract</Button>
                </div>
                </td>  </> 
                   : '' }

                 
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
export default AllContract;
