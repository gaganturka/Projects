import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { httpGet } from "../Action";
import Table from "react-bootstrap/Table";
import moment from "moment";

const ViewContract = () => {
  const [data, setData] = useState({});
  const { id } = useParams();
  console.log("fwedf", id);

  useEffect(() => {
    getContract();
  }, []);

  const getContract = async () => {
    const contract = await httpGet(`contract/detail/${id}`);
    console.log("daqta", contract.data);
    setData(contract.data);
  };

  return (
    <>

<div className="title-bar">
          <h2>View Contract </h2>
        </div>

      <div className="table-bar">
        
        <div className="contactorlist">
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
                <li>CONTRACT END DATE</li>
                <li>{moment(data.endDate).format("DD-MM-YYYY")}</li>
            </ul>

            <ul className="contactorlist-ul">
                <li>Email</li>
                <li>{data.email}</li>
            </ul>
            <ul className="contactorlist-ul">
                <li>CUSTOMER/VENDOR Email</li>
                <li>{data.customerEmail}</li>
            </ul>
            <ul className="contactorlist-ul">
                <li>SPOC NAME</li>
                <li>{data.spocName}</li>
            </ul>
            <ul className="contactorlist-ul">
                <li>START DATE</li>
                <li>{moment(data.startDate).format("DD-MM-YYYY")}</li>
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
