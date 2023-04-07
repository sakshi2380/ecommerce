
import { useSelector} from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import "./Profile.css";
import profilePng from "../../images/Profile.png";
import React, { Fragment, useRef, useState,useEffect } from "react";
const loadCart = () => {

  if(typeof window != undefined)
  {
      if(localStorage.getItem("jwt"))
      {
          return JSON.parse(localStorage.getItem("jwt"))
      }

  }
}

const Profile = () => {
  const [user, setProducts] = useState([]);
useEffect(() => {
setProducts(loadCart())
}, []);
  const { loading, isAuthenticated } = useSelector((state) => state.user);
   
//   useEffect(() => {
//     if (isAuthenticated === false) {
//       history.push("/login");
//     }
//   }, [history, isAuthenticated]);
  return (
    
    <Fragment>
      ffffffffffffffffffffffffffffffffff
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`User's Profile`} />
          
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={profilePng} alt={"name"} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{"User"}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{"email"}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                {/* <p>{String(user.createdAt).substr(0, 10)}</p> */}
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;