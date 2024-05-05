import React, { useContext } from 'react'
import { useEffect,useState } from 'react';
import Navbar from '../components/Navbar'
import { UserContext } from '../context/userContext';
const Home = () => {  
  const {user} = useContext(UserContext)
  return (
    <>
        <Navbar
        links={[
          { href: "/", name: "Home" },
          { href: "#donate", name: "Donate Now" },
          { href: "#past", name: "Past Campaigns" },
          { href: "#volunteer", name: "Volunteer" },
          { href: "#start", name: "Start a fundraiser" },
          {button: true, path: "/login", btn_name: "Login"}
        ]} 
      />
    </>
  )
}

export default Home