import "./App.css";
import React from "react";


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./component/layout/Header/Header.js";
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";

import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";

import {useSelector } from "react-redux";
import UserOption from "./component/layout/Header/UserOption";
import Profile from "./component/User/Profile";
import UpdateProfile from "./component/User/UpdateProfile";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";

import MyOrders from "./component/Order/MyOrders";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import UpdatePasssword from "./component/User/UpdatePassword";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";

import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOption";
import OrderSuccess from "./component/Cart/OrderSuccess";

import Contact from "./component/Home/contact";
import About from "./component/Home/About";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard.js";
import NewProduct from "./component/Admin/NewProduct";
import ProductList from "./component/Admin/ProductList";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList"
import UpdateUser from "./component/Admin/UpdateUser"
import ProductReviews from "./component/Admin/ProductReviews";
import NotFound from "./component/layout/Not Found/NotFound";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const c1 = localStorage.getItem("token");

  console.log(c1);

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser(c1));
  }, [c1]);
  window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/Search" element={<Search />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route path="*" element={<NotFound />} />

        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/password" element={<ResetPassword />} />
        <Route exact path="/contact" element={<Contact />} />

        <Route exact path="/about" element={<About />} />

        <Route path="/" element={<ProtectedRoute />}>
          <Route exact path="/account" element={<Profile />} />
          <Route exact path="/me/update" element={<UpdateProfile />} />
          <Route exact path="/password/update" element={<UpdatePasssword />} />
          <Route exact path="/Cart" element={<Cart />} />
          <Route exact path="/useroption" element={<UserOption />} />
          <Route exact path="/shipping" element={<Shipping />} />
          <Route exact path="/order/confirm" element={<ConfirmOrder />} />
          <Route exact path="/success" element={<OrderSuccess />} />
          <Route exact path="/orders" element={<MyOrders />} />
          <Route exact path="/process/payment" element={<Payment />} />
          <Route exact path="/order/:id" element={<OrderDetails />} />
          <Route exact path="/admin/dashboard" element={<Dashboard />} />
          <Route exact path="/admin/products" element={<ProductList />} />
          <Route exact path="/admin/product" element={<NewProduct />} />
          <Route exact path="/admin/product/:id" element={<UpdateProduct />} />
          <Route exact path="/admin/orders" element={<OrderList />} />
          <Route exact path="/admin/order/:id" element={<ProcessOrder />} />
          <Route exact path="/admin/users" element={<UsersList />} />
          <Route exact path="/admin/user/:id" element={<UpdateUser/>} />
          <Route exact path="/admin/reviews" element={<ProductReviews/>} />
        </Route>

        {/* <Route exact path="/process/payment" element={<Payment />} /> */}
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
