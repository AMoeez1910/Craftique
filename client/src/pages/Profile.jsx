
import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Address from '../components/Address';
import Orders from '../components/Orders';
import UserProfile from '../components/UserProfile';
import { UserContext } from '../context/userContext';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { Separator } from "../components/ui/separator";


const Profile = () => {
  const [render, setRender] = useState("Profile");
  const [data, setData] = useState({
    email: "",
    FirstName: "",
    LastName: "",
    googleID: "",
    address: {},
    orders: {},
  });
  const {  user,ready } = useContext(UserContext);
  const sidebarNavItems = [
    {
      title: "Profile"
    },
    {
      title: "Orders"
    },
    {
      title: "Address"
    },
    
  ];
  
 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/user-profile/${user._id}`);
        const { FirstName, LastName, email, orders, googleID, address } =
          response.data;
        if (googleID)
          setData({
            email: email,
            FirstName: FirstName,
            LastName: LastName,
            googleID: googleID,
            address: address,
            orders: orders,
          });
        else
          setData({
            email: email,
            FirstName: FirstName,
            LastName: LastName,
            address: address,
            googleID: null,
            orders: orders,
          });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  if (!ready) {
    return "Loading.....";
  }
  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <Navbar links={[{ button: true, path: "/", btn_name: "Logout" }]} />
      <div id="wrapper">
        <Sidebar setRender={setRender} />
        {render === 'Profile' && <UserProfile 
        FirstName={data.FirstName} 
        LastName={data.LastName} 
        email={data.email}
        googleID={data.googleID}
        id = {user._id}
        />}
        {render === 'Orders' && <Orders 
          orderData ={data.orders}
        />}
        {render === 'Address' && <Address 
          addressData={data.address}
          id={user._id}
        />}
          </div>
        </div>
     
      </div>
        
    </div>
  );
};

export default Profile;
