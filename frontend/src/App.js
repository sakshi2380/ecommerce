
import './App.css';
import React from "react";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Header from "./component/layout/Header/Header.js"
import WebFont from "webfontloader"
import Footer from "./component/layout/Footer/Footer.js"
import Home from "./component/Home/Home.js";
import Loader from './component/layout/Loader/Loader';
import ProductDetails from "./component/Product/ProductDetails"
import Products from "./component/Product/Products"
import Search from "./component/Product/Search"
import LoginSignUp from './component/User/LoginSignUp';
import UserOption from "./component/layout/Header/UserOption"
import Profile from './component/User/Profile';
function App() {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    })
  },[])
  return (
    <Router>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/product/:id" element={<ProductDetails/>} />
        <Route exact path="/products" element={<Products/>} />
        <Route path="/products/:keyword" element={<Products/>} />
        <Route exact path="/search" element={<Search/>} />
        <Route exact path="/login" element={<LoginSignUp/>} />
        <Route exact path="/useroption" element={<UserOption/>} />
        <Route exact path="/account" element={<Profile/>} />
        

      </Routes>
        
        
      <Footer />
       </Router>
    
  );
}

export default App;
