import React, { Fragment,useEffect } from 'react'
import "./Home.css";
import { CgMouse } from "react-icons/cg";
import ProductCard from "./ProductCart";
import MetaData from '../layout/MetaData';
import {getProduct,clearErrors} from "../../actions/productAction"
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from 'react-alert';
import UserOption from "../layout/Header/UserOption"
// import { useAlert } from "react-alert";
const product = {
  name:"blueshirt",
  price:"400",
  _id:"sakshi",
  images:[{
    url:"https://images.pexels.com/photos/2769274/pexels-photo-2769274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }]
}
const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          
          <MetaData title="ECOMMERCE" />

          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Home