import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { httpGet } from "../Action";
import Table from "react-bootstrap/Table";
import moment from "moment";
import Button from 'react-bootstrap/Button';
import { formateDate, showSucess } from "../helper/heper";
import { Col, Row } from "react-bootstrap";


const ViewContract = () => {
  const [data, setData] = useState({});
  const { id } = useParams();
  
  useEffect(() => {
    getContract();
  }, []);

  const getContract = async () => {
    const contract = await httpGet(`contract/detail/${id}`);
    setData(contract.data);
  };

  const reSendInvitation = async(e) => {
    const contract = await httpGet(`contract/resend/${id}`);
    console.log("daqta", contract);
    if(contract.status == '200'){
      showSucess(contract.message)
    }
  }

  return (
    <>

<div className="title-bar">
          <h2>View Contract </h2>
        </div>

      <div className="table-bar">

<div className="contactorlist contactorlist-parent-box">

      <div className="custom-warn-box alert-warning">
    <h4> Contract Expiry:  {formateDate(data.endDate)}  </h4>
     <Button  variant="primary" className="btnblack" onClick={reSendInvitation}>Send Reminder</Button> 
        
        </div>
        
        </div>

        <div className="contactorlist ">
          <Table responsive>

          
          <tbody>
       
            <tr className="contactorlist-ul">
                <td>NAME</td>
                <td>{data.name}</td>
            </tr>
            <tr className="contactorlist-ul">
                <td>CUSTOMER/VENDOR NAME</td>
                <td>{data.customerName}</td>
            </tr>
            <tr className="contactorlist-ul">
                <td>TYPE OF CONTRACT</td>
                <td>{data?.type?.name}</td>
            </tr>
           
            <tr className="contactorlist-ul">
                <td>Email</td>
                <td>{data.email}</td>
            </tr>
            <tr className="contactorlist-ul">
                <td>CUSTOMER/VENDOR EMAIL</td>
                <td>{data.customerEmail}</td>
            </tr>
            <tr className="contactorlist-ul">
                <td>SPOC NAME</td>
                <td>{data.spocName}</td>
            </tr>
            <tr className="contactorlist-ul">
                <td>START DATE</td>
                <td>{formateDate(data.startDate)}</td>
            </tr>
            <tr className="contactorlist-ul">
                <td>SUB CONTRACT TYPE</td>
                <td>{data.subContractType?.name}</td>
            </tr>
            <tr className="contactorlist-ul">
                <td>DEPARTMENT</td>
                <td>{data.department?.name}</td>
            </tr>
            <tr className="contactorlist-ul">

            <td>DOCUMENT</td>
            {data?.file ? 
            <td> <a href={data?.file}>{data?.file}</a></td> :  <td>NO DOCUMENT EXIST</td> }
            </tr>
            </tbody>
            </Table>
        </div>
        
      </div>
    </>
  );
};

export default ViewContract;
