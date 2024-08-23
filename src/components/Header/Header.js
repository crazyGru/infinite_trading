import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.png";
import { DoorArrowRightRegular } from "@fluentui/react-icons";
import { Avatar } from "@fluentui/react-components";
import { useSelector } from "react-redux";

function Header() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <header>
      <nav>
        <Link to="/">
          <img src={logo} alt="Infinite Logo" className="logo" />
        </Link>
        <div className="login-container">
          {console.log(userInfo)}
          {isAuthenticated ? (
            userInfo ? (
              <Avatar name={userInfo.username} aria-label="user" />
            ) : (
              <Avatar name="User" aria-label="user" />
            )
          ) : (
            <Link to="/login">
              <Avatar icon={<DoorArrowRightRegular />} aria-label="login" />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
