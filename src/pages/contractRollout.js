import { Col, Row, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import { httpGet, httpPost } from "../Action";
import { showError, showSucess } from "../helper/heper";
import { AppContext } from "../helper/context";
import moment from "moment";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";

const ContractRollout = () => {
  const { decodeToken } = useContext(AppContext);
  const [emailList, setEmailList] = useState([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState("");
  const [remiderEmail, setReminderEmail] = useState([]);
  const [page, setPage] = useState("brodcast");
  const [replyMessageId, setReplyMessageId] = useState('')
  const [data, setData] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {console.log('fysdfhtdgsa', data)}, [data]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // const reader = new FileReader();

      // reader.onload = (event) => {
      //   const fileContent = event.target.result;
      //   const emailPattern = /[\w\d+.-]+@[\w\d.-]+\.[\w\d.-]+/g;
      //   const extractedEmails = fileContent.match(emailPattern) || [];
      //   setEmailList(extractedEmails);

      Papa.parse(file, {
        header: true,
        complete: (results) => setData(results.data),
      })  
  };
  }

  const submit = async (e) => {
    e.preventDefault();
    const newFormData = new FormData();
    newFormData.append("emailList", JSON.stringify(data));
    newFormData.append("message", message);
    newFormData.append("subject", subject);
    newFormData.append("file", file);
    if(replyMessageId){
      newFormData.append("replyMessageId", replyMessageId);

    }
    // newFormData.append("endDate",endDate);

    const response = await httpPost("contract/roleout/", newFormData);
    if (response.status == "400") {
      console.log("err");
      showError(response.message);
    } else {
      setMessage('');
      setSubject('');
      setFile('');
      setData([]);
      setReminderEmail([]);
      setReplyMessageId('')
      showSucess(response.message);
      navigate('/contractrollout')
      console.log("res", response.data);
    }
  };
  const deleteEmail = (index) => {
    const newEmails = [...data];
    console.log("emailList", emailList);
    console.log("index", newEmails.splice(index, 1));
    setData(newEmails);
  };

  const reminderEmailFunc = (e) => {
    setPage("reminder");
    console.log(e.target.name, e.target.value);
    const userId = decodeToken().userId;
    getContractOfUser(userId);
  };

  const getContractOfUser = async (id) => {
    const response = await httpGet(`contract/roleout/${id}`);
    if (response.status == "400") {
      console.log("err");
      showError(response.message);
    } else {
      
      setReminderEmail(response.data);
    }
  };

  const remiderEmailData = (e) => {
    const targetId = e;
    const foundObject = remiderEmail.find(
      (obj) => obj._id.toString() === targetId.toString()
    );
    console.log("foundObject", foundObject);
   const emailListOfUsers =foundObject.emailList;
   setData(emailListOfUsers)
   setReplyMessageId(foundObject?.messageId)
   setSubject(foundObject?.subject)
  };

  const emailSetInMessage= (e) => {
    e.preventDefault();
  setMessage(`${message} {email}`);
  }


  const nameSetInMessage= (e) => {
    e.preventDefault();
  setMessage(`${message} {name}`);
  }
  return (
    <>
      <div clsassName="form">
        <Row>
          <Col md={6}>
            <div className="title-bar">
              <h2>Contract Rollout</h2>
            </div>
            <div className="d-flex align-items-center forminputs-bar">
              <Form.Check
                className="cursor-pointer"
                type="radio"
                label="New Email Broadcast"
                name="formHorizontalRadios1"
                id="formHorizontalRadios1"
                onClick={() => setPage("brodcast")}
              defaultChecked
              />
              <Form.Check
                className="cursor-pointer"
                type="radio"
                label="Reminder Email"
                name="formHorizontalRadios1"
                id="formHorizontalRadios2"
                onClick={(e) => reminderEmailFunc(e)}
              />
            </div>

            <div className="form">
              <Form>
                {page == "brodcast" ? (
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter the intent of the mail"
                      name="name"
                      value={subject}
                      onChange={(e) =>
                      setSubject(e.target.value) }
                    />
                  </Form.Group>
                ) : (
                  <Form.Group className="mb-3">
                    <Form.Label>Subject</Form.Label>
                    <Form.Select
                      className="form-control"
                      name="reminderFrequency"
                      
                      onChange={(e) => remiderEmailData(e.target.value)}
                    >
                      <option>Select Email</option>
                      {remiderEmail.map((item) => (
                        <>
                          <option value={item._id}>{`${moment(item.createdAt).format('DD-MM-YYYY')} ${item.subject}`}</option>
                        </>
                      ))}
                    </Form.Select>
                  </Form.Group>
                )}
                {page == "brodcast" ? (
                  <>
                    <Form.Label>Emails</Form.Label>
                    <InputGroup className="mb-3 uploademails">
                      <input type="file" accept=".csv" onChange={handleFileUpload} />
                    </InputGroup>
                  </>
                ) : (
                  ""
                )}

                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    type="text"
                    placeholder="Enter Email Message"
                    value={message}
                    name="message"
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </Form.Group>
<div className="d-flex btnblac_2">
<Button  className="mx-2 btnblack" type="submit" onClick={(e) => emailSetInMessage(e)}>
                    {`{email}`}
                  </Button>
                <Button className="mx-2 btnblack" type="submit" onClick={(e) => nameSetInMessage(e)}>
                    {`{name}`}
                  </Button>

  </div>
                 

                <Row>
                  <Col className="uploadbar">
                    <Form.Label>Upload Document</Form.Label>
                    <Form.Control
                      type="file"
                      className="form-control"
                      placeholder="Upload Document"
                      name="file"
                     
                      accept=".jpeg, .png, .pdf"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </Col>
                </Row>

                <div class="btngroups">
                  {/* <Button className="btnblack" type="submit" onClick={"submit"}>
                    Preview
                  </Button> */}
                  <Button className="btnblack" type="submit" onClick={submit}>
                    Submit
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
          <Col md={6}>
            <div className="emailadded-bar">
              <div className="title-bar">
                <h3>Email Added</h3>
              </div>
              <ul className="emaillisting mb-0 p-0 ">
                <li className="d-flex align-items-center justify-content-between pb-2 mb-2">
               
                    {/* {emailList.map((email, index) => (
                      <li key={index}>
                        {email} */}
                                  <Table responsive>
            <thead>
              <tr>
              <th>Name</th>
              <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

              {data.map((item, index) => {
                return (
                  <>
                    <tr>
                    <td>{item?.name}</td>
                    <td>{item?.email}</td>
                      <td>
                      <button
                          className="del-btn"
                          onClick={() => deleteEmail(index)}
                        > 
                          <RiDeleteBin5Line />
                        </button> 
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </Table>

                    
                    
                      {/* </li>
                    ))} */}
                </li>
                {/* <li className='d-flex align-items-center justify-content-between pb-2 mb-2'>
                  <p className="mb-0">xyz@email.com</p>
                  <button className="del-btn">
                    <RiDeleteBin5Line/>
                  </button>
                </li>
                <li className='d-flex align-items-center justify-content-between pb-2 mb-2'>
                  <p className="mb-0">xyz@email.com</p>
                  <button className="del-btn">
                    <RiDeleteBin5Line/>
                  </button>
                </li> */}
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default ContractRollout;
