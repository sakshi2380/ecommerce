import React, { useState } from "react";
import { validatePassword, validcPassword } from "../../utils/validations";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { putWithoutToken } from "../../auth/helper";
import { toast } from "react-toastify";
import profilePng from "../../../src/images/12.png";

const DefaultValues = {
  password: "",
  cpassword: "",
};

const ResetPassword = () => {
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd1, setShowPwd1] = useState(false);
  const [values, setValues] = useState(DefaultValues);
  const [errors, setErrors] = useState({
    password: "",
    cpassword: "",
  });

  const { password, confirm_password } = values;
  const uid = window.location.href.split("/")[4];
  console.log(uid, "uid");

  const token = window.location.href.split("/")[5];
  console.log(token, "token");

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
    console.log(cpwdError, "values.cpassword");

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

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return false;
    }
    console.log(token,"vuhuhg");

    let payload = {
      //  token: token,
      password: values.password,
      confirmPassword: values.cpassword,
    };
    putWithoutToken(`password/reset`,token, payload)
      .then((response) => {
        console.log(response, "rrr");
      })
      .catch((error) => {
        toast.error("Something went wrong");
      });
  };
  return (
    <>
      <section className="calcc bg-white">
        <div className="container py-5 h-100">
          <div className="row align-items-center justify-content-center  hvh-80 ">
            <div className="col-md-8 col-lg-7 col-xl-6 text-center">
              <img src={profilePng} className="img-fluid" alt="image" />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5">
              <div className="mb-3 text-primary">
                <h3>Reset Password</h3>
              </div>
              <form onSubmit={onSubmit}>
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

                <div className="h-45 d-grid ">
                  <button
                    type="submit"
                    className="btn btn-outline-primary btn-sm btn-block c-btn "
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

export default ResetPassword;