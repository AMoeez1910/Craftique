import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Links from "./Links";
import { UserContext } from "../context/userContext";
import { Button } from "./ui/button";

export default function Navbar({links  }) {
  const navigate = useNavigate();
  const {user,setUser} = useContext(UserContext)
  
  const logout = () => {
    axios.get('/logout')
      .then(res => {
        if (res.data && res.data.Status === "Success") {
          setUser(null); 
          toast.success("Successfully logged out");
          navigate('/'); 
          
        }
      })
      .catch(err => console.log(err));
  };
  

  return (
    <nav
      id="mainNav"
      className="navbar navbar-expand-md navbar-shrink py-3 navbar-light"
    >
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img src={logo} style={{ width: "100px" }} alt="Logo"></img>
        </a>
          <span className="visually-hidden">Toggle navigation</span>
          <span className="navbar-toggler-icon" />
        <Button variant="outline">Button</Button>
        <div id="navcol-1" className="collapse navbar-collapse">

          <ul className="navbar-nav mx-auto">
            <Links hrefs={links} />


            {!!user && (
              <div>
              <li className="nav-item ">
                <a className="nav-link active" href="/profile">
                  Hello {user.FirstName}!
                </a>
              </li>
              </div>
            )}
          </ul>
          {user ? (
            links[links.length - 1].button === true ? (
            <button
              className="btn btn-primary shadow rounded-pill"
              onClick={logout}
              type="button"
            >
              Logout
            </button>):(<></>)
          ) : (
              links[links.length - 1].button === true ? (
            <button
              className="btn btn-primary shadow rounded-pill"
              onClick={() =>
                navigate({
                  pathname: links[links.length - 1].path,
                  state: { from: window.location.pathname },
                })
              }
              type="button"
            >
              {links[links.length - 1].btn_name}
            </button>):(<></>)
          )}
        </div>
      </div>
    </nav>
  );
}