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
       
            <ul className="contactorlist-ul">
                <li>NAME</li>
                <li>{data.name}</li>
            </ul>
            <ul className="contactorlist-ul">
                <li>CUSTOMER/VENDOR NAME</li>
                <li>{data.customerName}</li>
            </ul>
            <ul className="contactorlist-ul">
                <li>TYPE OF CONTRACT</li>
                <li>{data?.type?.name}</li>
            </ul>
           
            <ul className="contactorlist-ul">
                <li>Email</li>
                <li>{data.email}</li>
            </ul>
            <ul className="contactorlist-ul">
                <li>CUSTOMER/VENDOR EMAIL</li>
                <li>{data.customerEmail}</li>
            </ul>
            <ul className="contactorlist-ul">
                <li>SPOC NAME</li>
                <li>{data.spocName}</li>
            </ul>
            <ul className="contactorlist-ul">
                <li>START DATE</li>
                <li>{formateDate(data.startDate)}</li>
            </ul>
            <ul className="contactorlist-ul">
                <li>SUB CONTRACT TYPE</li>
                <li>{data.subContractType?.name}</li>
            </ul>
            <ul className="contactorlist-ul">
                <li>DEPARTMENT</li>
                <li>{data.department?.name}</li>
            </ul>
            <ul className="contactorlist-ul">

            <li>DOCUMENT</li>
            {data?.file ? 
            <li> <a href={data?.file}>{data?.file}</a></li> :  <li>NO DOCUMENT EXIST</li> }
            </ul>


        </div>
        
      </div>
    </>
  );
};

export default ViewContract;
