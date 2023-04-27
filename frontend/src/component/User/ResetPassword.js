import React, { Fragment, useState, useEffect } from "react";
import "./ResetPassword.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useNavigate()
  const [otp, setOtp] = useState({
    code1: (Number = ""),
    code2: (Number = ""),
    code3: (Number = ""),
    code4: (Number = ""),
  });
  const [counter, setCounter] = useState(120);
  const [apiTokenData, setApiTokenData] = useState("");


  const data = window.location.href.split('=')
const token = data[1]
console.log(token);
  

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleOtpInput = (e, item, i) => {
    const CurrentElement = document.getElementById(item);

    if (CurrentElement?.value?.length == 1) {
      const NextElement = document.getElementById(
        item.replace(item.charAt(item.length - 1), (i + 2).toString())
      );
      NextElement?.focus();
    }
    if (e.key == "Backspace") {
      const PreviousElement = document.getElementById(
        item.replace(item.charAt(item.length - 1), i.toString())
      );
      PreviousElement?.focus();
    }
  };
  // const reSend = () => {
  //   if (counter != 0) return;
  //   if (apiTokenData) {

  //     putWithoutToken("/password/reset")
  //       .then((response) => {
  //         if (response.status == 200) {
  //           setCounter(60);
  //           toast.dismiss();
  //           toast.success(response.message);
  //         } else if (response.status == 400) {
  //           toast.error(response.message);
  //         }
  //       })
  //       .catch((error) => {
  //         toast.error("Something went wrong");
  //       });
  //   } else {
  //   }
  // };
  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    let newOtp = otp.code1 + otp.code2 + otp.code3 + otp.code4;
    let otpPayload = {};
    if (newOtp.length == 4) {
      if (newOtp == "0000") {
        otpPayload = {
          otp: newOtp,
          password: password,
          confirmPassword: confirmPassword,
        };
      } else {
        otpPayload = {
          otp: JSON.parse(newOtp),
          password: password,
          confirmPassword: confirmPassword,
        };
      }
    }

    dispatch(resetPassword(token, otpPayload));
  };
 


  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };
  useEffect(() => {
    const timer =
      counter > 0 &&
      setInterval(() => {
        setCounter(counter - 1);
      }, 1000);
    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password Updated Successfully");

      history("/");
    }
  }, [dispatch, error, alert, history, success]);
  return (
    <Fragment>
    {loading ? (
      <Loader />
    ) : (
      <Fragment>
        <MetaData title="Change Password" />
        <div className="resetPasswordContainer">
          <div className="resetPasswordBox">
            <h2 className="resetPasswordHeading">Update Profile</h2>

            <form
              className="resetPasswordForm"
              onSubmit={resetPasswordSubmit}
            >
               <div className="d-flex otp-input-field">
                    {Object.keys(otp).map((item, i) => (
                      <input
                        key={item}
                        autocomplete="off"
                        type="number"
                        onInput={maxLengthCheck}
                        className="Otp_BodyBox text-dark"
                        value={otp[item]}
                        maxLength={1}
                        id={item}
                        placeholder="-"
                        onChange={(e) => {
                          let temp = { ...otp };
                          temp[item] = e.target.value;
                          setOtp(temp);
                        }}
                        onKeyUp={(e) => {
                          handleOtpInput(e, item, i);
                        }}
                      />
                    ))}
                  </div>
              <div>
                <LockOpenIcon />
                <input
                  type="password"
                  placeholder="New Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="loginPassword">
                <LockIcon />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="text-left">
                  <p className="opensans-regular mb-0">
                    Have You Not Received The One-Time-
                  </p>
                  <div className="resend-otp">
                    Password ? &nbsp;
                    <span
                      // onClick={reSend}
                      style={{ opacity: counter != 0 && 0.2 }}
                    >
                       Resend
                    </span>
                    <span style={{ color: "#083541", fontWeight: "bold" }}>
                      &nbsp; 00 : {counter < 10 ? `0${counter}` : counter}
                    </span>
                  </div>
                </div>
              <input
                type="submit"
                value="Update"
                className="resetPasswordBtn"
                 disabled={counter == 0 || otp.code4 == ""}
              />
            </form>
          </div>
        </div>
      </Fragment>
    )}
  </Fragment>
  )
}

export default ResetPassword