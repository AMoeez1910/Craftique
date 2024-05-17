import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import { UserContext } from '../context/userContext';
import { Products } from './Products';
const Home = () => {  
  const {user} = useContext(UserContext)
  return (
    <div style={{ overflowY: 'auto', maxHeight: '100vh' }}>
      <Products />
    </div>
  )
}

export default Home