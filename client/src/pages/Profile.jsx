import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Address from '../components/Address';
import Orders from '../components/Orders';
import UserProfile from '../components/UserProfile';
import { UserContext } from '../context/userContext';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [render, setRender] = useState('Profile');
  const [data, setData] = useState({
    email: '',
    FirstName: '',
    LastName: '',
    googleID: '',
    address: {},
    orders: {}
  });
  const {  user } = useContext(UserContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/user-profile/${user._id}`)
        const {FirstName,LastName,email,orders,googleID,address} = response.data
        if(googleID)
        setData({
          email: email,
          FirstName: FirstName,
          LastName: LastName,
          googleID: googleID,
          address: address,
          orders: orders
        }
        )
        else 
        setData({
          email: email,
          FirstName: FirstName,
          LastName: LastName,
          address: address,
          googleID:null,
          orders: orders
        }
        )
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (user) { 
      fetchUserData();
    }
  }, [user]); 

  if (!user) {
    return <div>Loading...</div>;
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
        />}
        {render === 'Orders' && <Orders 
          orderData ={data.orders}
        />}
        {render === 'Address' && <Address 
          addressData={data.address}
        />}
      </div>
    </div>
  );
};

export default Profile;
