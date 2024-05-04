import { useState } from "react"
import {toast} from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import signup from "../assets/login.png";

// create state
export default function Register() {
  const navigate = useNavigate()
    const [data,setData]= useState({
        FirstName:'',
        LastName:'',
        email:'',
        password:'',
    })
    const registerUser = async (e) => {
        // not to automatically load
        e.preventDefault()
        const {FirstName,LastName,email,password,userType} = data
        try{
            const {data} = await axios.post('/register',{
                FirstName,LastName,email,password,userType
              })
              if(data.error){
                if(data.error.message){
                    toast.error(data.error.errors.email.properties.message)
                }
                else
                toast.error(data.error)
              }
              else{
                setData({})
                toast.success("Registration Successful")
                navigate('/login')
              }
        }
        catch(error){
            console.log(error)
        }
    }
    const handleChange = (event)=>{
        const { name, value } = event.target;
        setData(prevVal=> ({...prevVal,[name]:value}))
    }
    return (
    <>
      <Navbar links={[{ button: true, path: "/register", btn_name: "Sign Up" }]} />
      <section className="py-4 py-md-5 my-5">
        <div className="container py-md-5">
          <div className="row">
            <div className="col-md-6 text-center">
              <img className="img-fluid w-100" src={signup} />
            </div>
            <div className="col-md-5 col-xl-4 text-center text-md-start">
              <h2 className="display-6 fw-bold mb-5">
                <span className="underline pb-1">
                  <strong>Sign up</strong>
                </span>
              </h2>
              <form method="post" onSubmit={registerUser}>
                <div className="mb-3">
                  <input
                    className="shadow-sm form-control"
                    type="text"
                    name="FirstName"
                    placeholder="First Name"
                    value={data.FirstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    className="shadow-sm form-control"
                    type="text"
                    name="LastName"
                    placeholder="Last Name"
                    value={data.LastName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    className="shadow-sm form-control"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={data.email}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="mb-3">
                  <input
                    className="shadow-sm form-control"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={data.password}
                    onChange={handleChange
                    }
                  />
                </div>
                <div className="mb-5">
                  <button className="btn btn-primary shadow" type="submit">
                    Create account
                  </button>
                </div>
              </form>
              <p className="text-muted">
                Have an account?{" "}
                <a href="/login">
                  Log in&nbsp;
                  <svg
                    className="icon icon-tabler icon-tabler-arrow-narrow-right"
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <line x1={5} y1={12} x2={19} y2={12} />
                    <line x1={15} y1={16} x2={19} y2={12} />
                    <line x1={15} y1={8} x2={19} y2={12} />
                  </svg>
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
    
  );
}
