import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import { isAutheticated,setLocalStorage, getLocalStorage, authenticate } from "../../auth/helper";
import { updateProfile } from "../../auth/helper";
import { toast } from "react-toastify";
const UpdateProfile = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const token = getLocalStorage("token");
  const [userToken, setUserToken] = useState('')
  const jwt = getLocalStorage("jwt");
  console.log(JSON.parse(jwt)._id,'12');
  const id =JSON.parse(jwt)._id;
  const { loading } = useSelector((state) => state.productDetails);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  console.log(email,'email',name,'name');

  useEffect(() => {
    setUserToken(JSON.parse(token))
  },[])

  const updateProfileSubmit = (e) => {
    const obj ={
      email:email,
      name:name
    }
    updateProfile(id,userToken, obj)
      .then((response) => {
        console.log(response, "123");
        if (response.success == true) {
          // toast.success("Sucess");
          setLocalStorage("token",response.token)
          authenticate(response?.user,()=>{
            console.log("login");
          })
          // navigate("/login")
        } 
      })
      .catch((response) => {
        toast.error("Something went wrong");
      });
  };

  // if (isUpdated) {
  //   alert.success("Profile Updated Successfully");
  //   //dispatch(loadUser());

  //   history.push("/account");

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                // onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    //onChange={updateProfileDataChange}
                  />
                </div>
                {/* <input
                  type="submit",
                  value="Update"
                  className="updateProfileBtn"
                /> */}
                <button type="button"  className="btn btn-primary" onClick={updateProfileSubmit}>
                  cLICK ME
                </button>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
