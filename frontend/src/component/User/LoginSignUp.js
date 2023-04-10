import React, { Fragment, useRef, useState,useEffect } from "react";
import { REGISTER_URL,LOGIN_URL } from "../../backend";
import axios from "axios";
import "./LoginSignUp.css";
// import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenticate,postWithoutToken } from "../../auth/helper";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  validateEmail,
  validatePassword,
  validName,
  
} from "../../../src/utils/validations";


const LoginSignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
  
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  // const [loginEmail, setLoginEmail] = useState("");
  // const [loginPassword, setLoginPassword] = useState("");
  const DefaultValues = {
    name: "",
    email: "",
    password: "",
    
  };
  const DefaultValue = {
    email: "",
    password: "",
  };


  
 const [values, setValues] = useState(DefaultValues);
 const [errors, setErrors] = useState({
  name: "",
  email: "",
  password: "",
 
});
const [values1, setValue1] = useState(DefaultValue);
const [errors1, setError1] = useState({
  email: "",
  password: "",
});

const handleChange = (e) => {
  setValues({ ...values, [e.target.name]: e.target.value });
  // console.log(values, "///");
  if (errors[e.target.name]) {
    setErrors({ ...errors, [e.target.name]: "" });
    // console.log(errors, "<><");
  }
};
const handlechange = (e) => {
  setValue1({ ...values1, [e.target.name]: e.target.value });
  if (errors1[e.target.name]) {
    setError1({ ...errors1, [e.target.name]: "" });
   
  }
};
const validate = () => {
  let tempErrors = { ...errors };
  let valid = true;

  const nameError = validName(values.name);
  const emailError = validateEmail(values.email);
  const pwdError = validatePassword(values.password);

  
  const emailerror1 = validateEmail(values1.email);
  const pwderror1 = validatePassword(values1.password);
  
  if (nameError) {
    tempErrors = { ...tempErrors, name: nameError };
    valid = false;
  }
  if (emailError) {
    tempErrors = { ...tempErrors, email: emailError };
    valid = false;
  }
  if (pwdError) {
    tempErrors = { ...tempErrors, password: pwdError };
    valid = false;
  }
  if (emailerror1) {
    tempErrors = { ...tempErrors, email: emailerror1 };
    valid = false;
  }
  if (pwderror1) {
    tempErrors = { ...tempErrors, password: pwderror1 };
    valid = false;
  }
 
  setErrors(tempErrors);
  return valid;
};



  const loginSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return false;
    }
    e.preventDefault();
    
    postWithoutToken(LOGIN_URL, values1)
    .then((response)=>{
  console.log(response,"rrrrrrr");
      })
    
  };
//const REGISTER_URL = "/register";
  const registerSubmit = (e) => {
    // e.preventDefault();
    // if (!validate()) {
    //   return false;
    // }
    // postWithoutToken(REGISTER_URL, values)
    // .then((response) => {
    //   console.log(response);
    //   if (response.success == true) {
    //     toast.success("Sucess");
        
    //   } else {
    //     toast.error("User Already Exist");
    //   }
    // })
    // .catch((response) => {
    //   toast.error("Something went wrong");
    // });
};
    
  
  
  
    


  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  return (
   
        // <Fragment>
        //   {loading ? (
        //     <Loader />
        //   ) : (
            <Fragment>
              <div className="LoginSignUpContainer">
                <div className="LoginSignUpBox">
                  <div>
                    <div className="login_signUp_toggle">
                      <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                      <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                    </div>
                    <button ref={switcherTab}></button>
                  </div>
                  <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                    <div className="loginEmail">
                      <MailOutlineIcon />
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        name="email"
                        onChange={handlechange}
                        value={values1.email}
                        error={errors1.email}                   />
                    </div>
                    <div className="loginPassword">
                      <LockOpenIcon />
                      <input
                        type="password"
                        placeholder="Password"
                        required
                        onChange={handlechange}
                        name="password"
                        value={values1.password}
                        error={errors1.password}
                      />
                    </div>
                    <Link to="/password/forgot">Forget Password ?</Link>
                    <input type="submit" value="Login"  onClick={loginSubmit} className="loginBtn" />
                  </form>
                  <form
                    className="signUpForm"
                    ref={registerTab}
                    encType="multipart/form-data"
                    onSubmit={registerSubmit}
                  >
                    <div className="signUpName">
                      <FaceIcon />
                      <input
                        type="text"
                        placeholder="Name"
                        required
                        name="name"
                    onChange={handleChange}
                    value={values.name}
                    error={errors.name}
                      />
                       {errors.name && (
                    <p className="text-danger insta-smart-error">
                      {errors.name}
                    </p>
                  )}
                    </div>
                    <div className="signUpEmail">
                      <MailOutlineIcon />
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        name="email"
                        onChange={handleChange}
                        value={values.email}
                        error={errors.email}
                      />
                      {errors.email && (
                    <p className="text-danger insta-smart-error">
                      {errors.email}
                    </p>
                  )}
                    </div>
                    <div className="signUpPassword">
                      <LockOpenIcon />
                      <input
                        type="password"
                        placeholder="Password"
                        required
                        onChange={handleChange}
                        name="password"
                        value={values.password}
                        error={errors.password}
                      />
                      
                    </div>
    
                    <div id="registerImage">
                      {/* <img src={avatarPreview} alt="Avatar Preview" /> */}
                      {/* <input
                        type="file"
                        name="avatar"
                        accept="images/*"
                        onChange={registerDataChange}
                      /> */}
                    </div>
                    <input type="submit" value="Register" className="signUpBtn" />
                  </form>
                </div>
              </div>
            </Fragment>
//           )}
//       </Fragment>
//       )
  
// };
  )
 }

export default LoginSignUp;