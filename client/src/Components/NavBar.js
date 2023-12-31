import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiCart } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';

const NavBar = ({count}) => {
  const [click, setClick] = useState(false);
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [userName, setUserName] = useState(null);
  const [, forceUpdate] = useState();

  const userData = Cookies.get('userData');
 console.log("usrdata new", userData);
 
 useEffect(() => {
 
  const checkUserLogin = () => {
    
    if (userData) {
      const parsedUserData = JSON.parse(userData);

      if (parsedUserData && parsedUserData.name) {
        setIsLogedIn(true);
        setUserName(parsedUserData.name);
      }
    }
  };

  checkUserLogin();
}, [userData])
  
  const handleClick = () => setClick(!click);

  const logout = () => {
    Cookies.remove('userData');
    setIsLogedIn(false);
    setUserName(null);
    toast.error("Logout Successfullt! ", {
      position: 'top-right'
    })

  }

  return (
    <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <h2>Shopee</h2>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/products"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/about"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/contact"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Contact
              </NavLink>
            </li>
          </ul>
          <div className="login-cart">
          {userName ? (
            <p className="text-primary">{userName.toUpperCase()}</p>
          ) : (
            <p>
              <NavLink
                to="/login"
                exact
                activeClassName="active"
                className="nav-links"
              >
                Login
              </NavLink>
            </p>
          )}

          {isLogedIn ? <p>
              <NavLink to='/' className='nav-links' onClick={logout}>
                Logout
              </NavLink>
            </p> : ''}
            
            <p>
                <NavLink to="/cartlist"   exact
                activeClassName="active"
                className="nav-links"
               >
                      <BiCart size={25}/><sup>{count}</sup>
                </NavLink>
                  
              </p>
          </div>
          
          <div className="nav-icon" onClick={handleClick}>
         

            {click ? (
              <span className="icon">
                < AiOutlineClose size={20}/>
              </span>
            ) : (
              <span className="icon">
                <GiHamburgerMenu size={20}/>
              </span>
            )}
          </div>
        </div>
      </nav>
  );
};

export default NavBar;
