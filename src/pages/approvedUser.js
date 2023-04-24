import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import {  httpGet } from "../Action";
import { showError, showSucess,  showLoading } from "../helper/heper";
import moment from "moment";

const ApprovedUser = () => {
 

    

    const [users, setUsers] = useState([])
    useEffect(() => {
        getUsers()
    },[])
    const getUsers = async () => {
        const usersData = await httpGet("user/approved");
        console.log('efdfef', usersData);
        setUsers(usersData.data);
      };

    return(
        <>
        
        <div className="body-main">
          <div className="title-bar d-flex align-items-center justify-content-between">
            <h2>APPROVED USER</h2>
            
          </div>
          <div className="table-bar">
            <Table>
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>DEPARTMENT</th>
                  <th>DESIGNATION</th>
                  <th>APPROVED AT</th>
                </tr>
              </thead>
              <tbody>
              {users.map((item) => {
return (<>            
                      <tr>
                    <td>{item?.name}</td>
                    <td>{item?.email}</td>
                    <td>{item?.department?.name}</td>
                    <td>{item?.designation?.name}</td>
                    <td>{moment(item?.approvedAt).format('DD_MM_YYYY')}</td>
                      </tr>
                      </>)

                     })}
              </tbody>
            </Table>
          </div>
        </div>
      </>
  
    )
}


export default ApprovedUser