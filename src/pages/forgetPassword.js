import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { httpGet, httpPost } from "../Action";
import { showError, showSucess } from "../helper/heper";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(0);
  const [otp, setOtp] = useState("");
  const [id, setId] = useState("");
  const [newPass, setNewPass] = useState("")
  const [confirmNewPass, setConfirmNewPass] = useState("")
  const navigate = useNavigate()

  const submit = async () => {
    let finalResponse;
    if (step == 0) {
      const response = await httpPost("user/forget/otp", { email: email });
      finalResponse = response;
      setId(finalResponse?.data);
    } else if (step == 1) {
      const response = await httpPost("user/forget/verify/otp", { otp: otp, userId : id });
      finalResponse = response;
    } else if (step == 2) {
      const response = await httpPost("user/forget/change/password", { password: newPass, userId : id , confirmPassword : confirmNewPass});
      finalResponse = response;
    }

    console.log("finalResponse", finalResponse);
    if (finalResponse.status == "400") {
      console.log("err");
      showError(finalResponse.message);
    } else {
      if (step == 0) {
        setStep(1);
      } else if (step == 1) {
        setStep(2);
      }
      if (step == 2) {
        setStep(0);
        navigate('/log-in')
      }
      showSucess(finalResponse.message);
      console.log("res", finalResponse.data);
    }
  };

  return (
    <>
      <div className="main-form">
        {/* <Form> */}

        {step === 0 ? (
          <>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Please Enter Email"
                  name="name"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              ;
            </Form>
            ;
          </>
        ) : null}

        {step === 1 ? (
          <>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>OTP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Please Enter OTP"
                  name="otp"
                  onChange={(e) => setOtp(e.target.value)}
                />
              </Form.Group>
              ;
            </Form>
          </>
        ) : null}

        {step === 2 ? (
          <>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Please New Password"
                  name="otp"
                  onChange={(e) => setNewPass(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Please Confirm Password"
                  name="otp"
                  
                  onChange={(e) => setConfirmNewPass(e.target.value)}
                />
              </Form.Group>
            </Form>
            ;
          </>
        ) : null}

        <Button variant="primary" type="submit" onClick={submit}>
          Submit
        </Button>
        {/* </Form> */}
      </div>
    </>
  );
};

export default ForgetPassword;
