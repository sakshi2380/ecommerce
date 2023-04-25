

import React, { useState } from "react";
import { validatePassword, validcPassword } from "../../../src/utils/";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import {
  getLocalStorage,
  postWithoutToken,
  putWithoutToken,
} from "../../Api/allApi";
import { toast } from "react-toastify";
import RESETIMG from "../assets/image/12.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const DefaultValues = {
  otp: "",
  password: "",
  cpassword: "",
};

const ResetPwd = () => {
  const [otp, setOtp] = useState({
    code1: (Number = ""),
    code2: (Number = ""),
    code3: (Number = ""),
    code4: (Number = ""),
  });
  const [counter, setCounter] = useState(120);
  //
  const [userEmail, setUserEmail] = useState("");
  const [apiTokenData, setApiTokenData] = useState("");

  
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd1, setShowPwd1] = useState(false);
  const [values, setValues] = useState(DefaultValues);
  const [errors, setErrors] = useState({
    password: "",
    cpassword: "",
  });



  const token = window.location.href.split("=")[1];

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

  useEffect(() => {
    // addClassToBody("auth-page");
    const token = window.location.href.split("/")[4];
    setApiTokenData(token);
    setUserEmail(JSON.parse(getLocalStorage("userEmail")));
  }, []);

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

  const reSend = () => {
    if (counter != 0) return;
    if (apiTokenData) {
      let reSendPayload = {
        email: userEmail,
      };
      putWithoutToken("/password/reset")
        .then((response) => {
          if (response.status == 200) {
            setCounter(60);
            toast.dismiss();
            toast.success(response.message);
          } else if (response.status == 400) {
            toast.error(response.message);
          }
        })
        .catch((error) => {
          toast.error("Something went wrong");
        });
    } else {
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });

    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    let tempErrors = { ...errors };
    let valid = true;

    const pwdError = validatePassword(values.password);
    const cpwdError = validcPassword(values);

    if (pwdError) {
      tempErrors = { ...tempErrors, password: pwdError };
      valid = false;
    }
    if (cpwdError) {
      tempErrors = { ...tempErrors, cpassword: cpwdError };
      valid = false;
    }
    setErrors(tempErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return false;
    }
    let newOtp = otp.code1 + otp.code2 + otp.code3 + otp.code4;
    let otpPayload = {};
    if (newOtp.length == 4) {
      if (newOtp == "0000") {
        otpPayload = {
          otp: newOtp,
          password: values.password,
          confirmPassword: values.cpassword,
        };
      } else {
        otpPayload = {
          otp: JSON.parse(newOtp),
          password: values.password,
          confirmPassword: values.cpassword,
        };
      }

      putWithoutToken("/password/reset", otpPayload)
        .then((response) => {
          if (response.status == 200) {
            toast.success(response.message);
          } else if (response.status == 400) {
            toast.error(response.message);
          }
        })
        .catch((error) => {
          toast.error("Something went wrong");
        });
    } else {
      toast.dismiss();
      toast.error("OTP is not correct");
    }
  };

  return (
    <>
      <section className="calcc bg-white">
        <div className="container h-100">
          <div className="row align-items-center justify-content-center hvh-80 ">
            <div className="col-md-8 col-lg-7 col-xl-6 text-center">
              <img src={RESETIMG} className="img-fluid" alt="image" />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5">
              <div className="mb-3 text-primary">
                <h3>VERIFY YOUR ACCOUNT</h3>
              </div>
              <form onSubmit={handleSubmit}>
                {/* ---------------------------- */}

                <div className="login-title">
                  <h4 className="opensans-bold mb-0 text-themeBlack text-center"></h4>
                </div>
                <div className="form-group mb-3 position-relative">
                  <p className="opensans-regular">
                    we have sent you an email at . Enter the code below to
                    confirm your email address Have you not received the OTP?
                  </p>
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
                </div>

                {/* -------------------------------- */}

                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="form1Example23">
                    Password
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type={showPwd ? "text" : "password"}
                      name="password"
                      id="form1Example23"
                      onChange={handleChange}
                      placeholder="**********"
                      value={values.password}
                      error={errors.password}
                      className="form-control form-control-lg"
                    />
                    <button
                      className="btn btn-show-eye"
                      type="button"
                      onClick={() => setShowPwd(!showPwd)}
                    >
                      {!showPwd ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-danger insta-smart-error">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="form1Example23">
                    Confirm Password
                  </label>
                  <div class="input-group mb-3">
                    <input
                      type={showPwd1 ? "text" : "password"}
                      name="cpassword"
                      id="form1Example23"
                      onChange={handleChange}
                      placeholder="**********"
                      value={values.cpassword}
                      error={errors.cpassword}
                      className="form-control form-control-lg"
                    />
                    <button
                      className="btn btn-show-eye"
                      type="button"
                      onClick={() => setShowPwd1(!showPwd1)}
                    >
                      {!showPwd1 ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </button>
                  </div>
                  {errors.cpassword && (
                    <p className="text-danger insta-smart-error">
                      {errors.cpassword}
                    </p>
                  )}
                </div>
                <div className="text-left">
                  <p className="opensans-regular mb-0">
                    Have You Not Received The One-Time-
                  </p>
                  <div className="resend-otp">
                    Password ? &nbsp;
                    <span
                      onClick={reSend}
                      style={{ opacity: counter != 0 && 0.2 }}
                    >
                      Please Resend
                    </span>
                    <span style={{ color: "#083541", fontWeight: "bold" }}>
                      &nbsp; 00 : {counter < 10 ? `0${counter}` : counter}
                    </span>
                  </div>
                </div>

                <div className="h-45 d-grid mt-3  ">
                  <button
                    type="submit"
                    className="btn btn-outline-primary btn-sm btn-block c-btn  text-uppercase"
                    disabled={counter == 0 || otp.code4 == ""}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPwd;
