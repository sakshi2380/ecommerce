
import { useSelector} from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import "./Profile.css";
import profilePng from "../../images/Profile.png";
import React, { Fragment, useRef, useState,useEffect } from "react";
import { isAutheticated,setLocalStorage, getLocalStorage, authenticate } from "../../auth/helper";
// const loadCart = () => {

//   if(typeof window != undefined)
//   {
//       if(localStorage.getItem("jwt"))
//       {
//           console.log("vdighvidhv",JSON.parse(localStorage.getItem("jwt"))); 
//       }

//   }
// }
// loadCart()
const Profile = () => {
  
  

  
 
  const jwt = getLocalStorage("jwt");
  const url =JSON.parse(jwt).avatar.url
  console.log(url);
  const { name,email,createdAt } =JSON.parse(localStorage.getItem("jwt"));
//   const update = (e) => {
//     e.preventDefault();
//     axios.get("http://localhost:4000/api/me",).then((response,err)=>{
//       if(err){
//         console.log(response);
//       }
//       else{
//         // localStorage.setItem("token", response?.data?.token);
//         authenticate(response?.data,()=>{
//           console.log("sign in");
//           navigate("/products");
//         })
//       }
//     })
//   };

  return (<>
  
  
  
            
        

  

    
    <Fragment>
     
      {/* {loading ? (
        <Loader />
      ) : (
        <Fragment> */}
          <MetaData title={`User's Profile`} />
         
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={url} alt={"name"} />
              <Link to="/me/update" >Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>User</h4>
                <p>{name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                {/* <p>{String(user.createdAt).substr(0, 10)}</p> */}
                <p>{String(createdAt.substr(0, 10))}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      {/* )}
    </Fragment> */}
    </>
  );
};

export default Profile;