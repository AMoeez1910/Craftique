import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { CartContext } from '../context/cart';

import { PlusIcon,MinusIcon } from "@radix-ui/react-icons";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../components/ui/table"
import { Button } from '../components/ui/button';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import toast from 'react-hot-toast';
export const Shoppingcart = () => {
    const navigate = useNavigate();
    const [cart,setCart] = useContext(CartContext);
    const {user} = useContext(UserContext);
    const [shipping,setshipping] = useState()
    const [total,setTotal] = useState() 
    useEffect(() => {
        const total = cart.reduce((acc, item) => acc + (item.product.price - item.product.discount) * item.quantity, 0);
        setTotal(total);
        if (total > 10000) {
            setshipping(0);
        } else {
            setshipping(500);
        }
    }, [cart]);
    const removeFromCart = (product) => {
        const productInCart = cart.find((item) => item.product._id === product._id);
        
        if (productInCart.quantity === 1) {
            setCart(cart.filter((item) => item.product._id !== product._id));
            localStorage.setItem('cart', JSON.stringify(cart.filter((item) => item.product._id !== product._id)));
        } else {
            setCart(
                cart.map((item) =>
                    item.product._id === product._id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
            );
            localStorage.setItem('cart', JSON.stringify(cart.map((item) =>
                item.product._id === product._id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )));
        }
    }
    const addToCart = (product) => {
        setCart(cart.map((item) =>  item.product._id === product._id ? { ...item, quantity: item.quantity + 1 } : item));
    }
    const placeOrder = async ()=>{
        try{
            if(!user){
                navigate('/login')	
                toast.error('Please login to place order')
            }
            if(!user.address.shippingAddress){
                navigate('/profile')	
                toast.error('Please add shipping address to place order')
            }
            else{
                await axios.post('/order', {cart, total: total + shipping,user: user._id})  
                toast.success('Order placed successfully')	
                setCart([])
                localStorage.removeItem('cart')
                navigate('/')
            }
        }
        catch(err)
        {
            toast.error(err)
        }
        
    }
  return (
      <>
  <Navbar
    links={[
      { href: "/", name: "Home" },
      { href: "#donate", name: "Donate Now" },
      { href: "#past", name: "Past Campaigns" },
      { href: "#volunteer", name: "Volunteer" },
      { href: "#start", name: "Start a fundraiser" },
      { button: true, path: "/Login", btn_name: "Login" },
      { button: true, path: "/Register", btn_name: "Register" }
    ]}
  />
  
  <h1 style={{ textAlign: 'center' }}>Shopping Cart</h1>
  <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ flex: 2, marginRight: '20px' }}>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead style={{ width: '100px' }}>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead className="text-right">SubTotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map((item) => (
                <TableRow key={item.product._id}>
                <TableCell >
                    <img src={item.product.images} alt={item.product.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                </TableCell>
                  <TableCell className="font-medium">{item.product.name}</TableCell>
                  <TableCell style={{ display: 'flex', alignItems: 'center' }}>
                    <div className='mt-4'>
                    <Button variant="outline" size="icon" style={{ marginRight: '8px' }} onClick={() => removeFromCart(item.product)}>
                        <MinusIcon className="h-4 w-4 mx-2" />
                    </Button>
                    <span>{item.quantity}</span>
                    <Button variant="outline" size="icon" style={{ marginLeft: '8px' }} onClick={() => addToCart(item.product)}>
                        <PlusIcon className="h-4 w-4" />
                    </Button>
                    </div>
                  </TableCell>
                  <TableCell>${item.product.price}</TableCell>
                  <TableCell>${item.product.discount}</TableCell>
                  <TableCell className="text-right">${(item.product.price - item.product.discount) * item.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      {cart.length > 0 && (
        <div style={{ flex: 1 }}>
          <div style={{ textAlign: 'right' }}>
            <h2>Checkout</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h4><b>SubTotal:</b></h4>
              <h4>${total}</h4>
            </div>
            <hr/>
            <p><b>Shipping</b>: ${shipping}</p>
            <p>Shipping to: {user?.address.shippingAddress.city}</p>
            <a href='/profile'>Change Address</a>
            <hr/>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h2>Total:</h2>
              <h2>${total + shipping}</h2>
            </div>
            <Button onClick={() => { placeOrder() }}>Place Order</Button>
          </div>
        </div>
      )}
    </div>
  </div>
</>

  )
}
// {user.address.shippingAddress.city},{user.address.shippingAddress.country}
