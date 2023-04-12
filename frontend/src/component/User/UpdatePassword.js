import React, { Fragment, useState, useEffect } from "react";
import "./UpdatePassword.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import { UPDATEPASS } from "../../backend";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import {
  isAutheticated,
  setLocalStorage,
  getLocalStorage,
  authenticate,
  putWithoutToken,
} from "../../auth/helper";
import { updateProfile } from "../../auth/helper";

import { Link, useNavigate } from "react-router-dom";
const UpdatePassword = ({ history }) => {
  const token = getLocalStorage("token");
  const [userToken, setUserToken] = useState("");
  const jwt = getLocalStorage("jwt");
  console.log(JSON.parse(jwt)._id, "12");
  const id = JSON.parse(jwt)._id;

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();


  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    
    putWithoutToken(UPDATEPASS,id, token, obj).then((response) => {
      console.log(response, "123");
      if (response.success == true) {
        // toast.success("Sucess");
        
        setLocalStorage("token", response.token);
        authenticate(response?.user, () => {
          console.log("login");
          navigate("/account")
        });
      }
    });
    
    
  };
  
  const obj = {
    oldPassword: oldPassword,
    newPassword: newPassword,
    confirmPassword: confirmPassword,
  };

  useEffect(() => {
    setUserToken(JSON.parse(token));
  }, [history]);

  return (
    // <Fragment>
    //   {loading ? (
    //     <Loader />
    //   ) : (
    <Fragment>
      <MetaData title="Change Password" />
      <div className="updatePasswordContainer">
        <div className="updatePasswordBox">
          <h2 className="updatePasswordHeading">Update Profile</h2>

          <form className="updatePasswordForm" onSubmit={updatePasswordSubmit}>
            <div className="loginPassword">
              <VpnKeyIcon />
              <input
                type="password"
                placeholder="Old Password"
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="loginPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="New Password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
            <input type="submit" value="Change" className="updatePasswordBtn" />
          </form>
        </div>
      </div>
    </Fragment>
    //   )}
    // </Fragment>
  );
};

export default UpdatePassword;
