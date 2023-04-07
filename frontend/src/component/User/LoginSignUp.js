import React, { Fragment, useRef, useState,useEffect } from "react";
import axios from "axios";
import "./LoginSignUp.css";
// import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../../auth/helper";


const LoginSignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
  
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [regEmail, setregEmail] = useState("");
  const [regPassword, setregPassword] = useState("");
 const [regName, setregName] = useState("");

  

  const loginSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:4000/api/login",{
      
      email:loginEmail,
      password:loginPassword
    }).then((response,err)=>{
      if(err){
        console.log(response);
      }
      else{
        // localStorage.setItem("token", response?.data?.token);
        authenticate(response?.data,()=>{
          console.log("sign in");
          navigate("/products");
        })
      }
    })
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:4000/api/register",{
      name:regName,
      email:regEmail,
      password:regPassword
    }).then((response)=>{
      console.log(response);
    })
    
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
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                      />
                    </div>
                    <div className="loginPassword">
                      <LockOpenIcon />
                      <input
                        type="password"
                        placeholder="Password"
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                    </div>
                    <Link to="/password/forgot">Forget Password ?</Link>
                    <input type="submit" value="Login" className="loginBtn" />
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
                        value={regName}
                        onChange={(e)=>setregName(e.target.value)}
                      />
                    </div>
                    <div className="signUpEmail">
                      <MailOutlineIcon />
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        name="email"
                        value={regEmail}
                        onChange={(e)=>setregEmail(e.target.value)}
                      />
                    </div>
                    <div className="signUpPassword">
                      <LockOpenIcon />
                      <input
                        type="password"
                        placeholder="Password"
                        required
                        name="password"
                        value={regPassword}
                        onChange={(e)=>setregPassword(e.target.value)}
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