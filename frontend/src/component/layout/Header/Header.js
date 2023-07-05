import React from "react";
import { ReactNavbar } from "overlay-navbar";

// import logo from "../../../images/OIP.jpg";
import { useSelector } from "react-redux";
import logo from "../../../images/OIP.jpg";


const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  console.log(isAuthenticated);

  return (
    <>
      <ReactNavbar
        burgerColorHover="rgb(84, 84, 247)"
        logo={logo}
        logoWidth="20vmax"
        navColor1="white"
        logoHoverSize="10px"
        logoHoverColor="rgb(84, 84, 247)"
        link1Text="Home"
        link2Text="Products"
        link3Text={isAuthenticated ? "Logout" : "Login"}
        link4Text="Search"
        link1Url="/"
        link2Url="/products"
        link3Url={isAuthenticated ? "logout" : "/login"}
        link4Url="/Search"
        link1Size="1.3vmax"
        link1Color="rgb(0,0,0)"
        nav1justifyContent="flex-end"
        nav2justifyContent="flex-end"
        nav3justifyContent="flex-start"
        nav4justifyContent="flex-start"
        link1ColorHover="rgb(84, 84, 247)"
        link1Margin="1vmax"
        profileIconUrl="/login"
        profileIconColor="rgba(35, 35, 35,0.8)"
        searchIconColor="rgba(35, 35, 35,0.8)"
        cartIconColor="rgba(35, 35, 35,0.8)"
        profileIconColorHover="#eb4034"
        searchIconColorHover="#eb4034"
        cartIconColorHover="#eb4034"
        cartIconMargin="1vmax"
      />
      ;
    </>
  );
};
export default Header;
