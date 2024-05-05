import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import login from "../assets/signup.png";
import { UserContext } from "../context/userContext";
import '../index.css'
export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false); 

  async function LoginUser(e) {
    e.preventDefault();
    const { email, password } = data;
  
    try {
      setLoading(true);
      const response = await axios.post("/login", {
        email,
        password,
      });
      setLoading(false); 
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setUser(response.data.user);
        toast.success("Welcome Back");
        navigate('/')
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  
  return (
    <>
      
      {loading ? (
    <div className="text-center ">
      <div className="loading-spinner"></div>
  </div>
) : (
  <>
  <Navbar
        links={[{ button: true, path: "/register", btn_name: "Sign Up" }]}
      />
   <section className="py-4 py-md-5 my-5">
        <div className="container py-md-5">
          <div className="row">
            <div className="col-md-6 text-center">
              <img className="img-fluid w-100" src={login} />
            </div>
            <div className="col-md-5 col-xl-4 text-center text-md-start">
              <h2 className="display-6 fw-bold mb-5">
                <span className="underline pb-1">
                  <strong>Login</strong>
                  <br />
                </span>
              </h2>
              <form method="post" data-bs-theme="light" onSubmit={LoginUser}>
                <div className="mb-3">
                  <input
                    className="shadow form-control"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <input
                    className="shadow form-control"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                  />
                </div>
                <div className="mb-5 row justify-content-center">
                    <div className="col-md-6">
                      <button className="btn btn-primary shadow btn-block" type="submit">
                        Log in
                      </button>
                    </div>
                    <div className="card">
                      <div className="card-body">
                        <a className="btn btn-block" href="http://localhost:8000/auth/google/callback" role="button">
                          <i className="fab fa-google"></i>
                          Sign In with Google
                        </a>
                      </div>
                    </div>

                    </div>


              </form>
              <p className="text-muted">
                <a href="/ResetPassword">Forgot your password?</a>
              </p>
              
            </div>
          </div>
        </div>
      </section>
      </>
)}

      
    </>
  );
}
