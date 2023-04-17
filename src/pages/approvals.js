import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { httpGet, httpPost } from "../Action";
import { CiCircleCheck, CiCircleRemove } from "react-icons/ci";
import { showError, showSucess } from "../helper/heper";
import moment from "moment";

const Approvals = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const department = await httpGet("user/");
    console.log("daqta", department.data);
    setUsers(department.data);
  };

  const updateUser = async (type, data) => {
    const response = await httpPost(`user/update/${type}`, data);
    if (response.status == "400") {
      console.log("err");
      showError(response.message);
    } else {
        getUsers()
      showSucess(response.message);
      console.log("res", response.data);
    }
  };

  const approveRequest = (e) => {
    // const approvedAt = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    if (window.confirm("Are you want to accept this request")) {
      updateUser("accept", { _id: e });
    }
  };

  const rejectRequest = (e) => {
    // const rejectAt = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    if (window.confirm("Are you want to reject this request")) {
      updateUser("reject", { _id: e });
    }
  };
  return (
    <>
<div className="body-main">
      <div className="titile-bar">
        <h2>Approvals</h2>
      </div>

      <div className="table-bar">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL ID</th>
              <th>DEPARTMENT</th>
              <th>DESIGNATION</th>
              <th>ACTIONS</th>
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
                    <td>
                      <CiCircleCheck onClick={() => approveRequest(item._id)} />
                      <CiCircleRemove onClick={() => rejectRequest(item._id)} />
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

export default Approvals;
