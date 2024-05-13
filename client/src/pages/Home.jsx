import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import { UserContext } from '../context/userContext';
import { Products } from './Products';
const Home = () => {  
  const {user} = useContext(UserContext)
  return (
    <div style={{ overflowY: 'auto', maxHeight: '100vh' }}>
        <Navbar
        links={[
          { href: "/", name: "Home" },
          { href: "#donate", name: "Donate Now" },
          { href: "#past", name: "Past Campaigns" },
          { href: "#volunteer", name: "Volunteer" },
          { href: "#start", name: "Start a fundraiser" },
          {button: true, path: "/Login", btn_name: "Login"},
          {button: true, path: "/Register", btn_name: "Register"}
        ]} 
      />
      <Products />
    </div>
  )
}

export default Home