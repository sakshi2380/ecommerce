import React,{useEffect} from 'react'
import {useSelector ,useDispatch} from "react-redux";
import { logout } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
const Logout = () => {
    const history = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
    useEffect(() => {
        
        dispatch(logout());
        alert.success("Logout Successfully");
        history("/")
      }, [dispatch]);
  return (
    <div>Logout</div>
  )
}

export default Logout