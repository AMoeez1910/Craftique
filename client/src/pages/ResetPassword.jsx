import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import Navbar from '../components/Navbar'
import forgot from "../assets/forgot.png";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
  });
  const ResetPasswordUser = async (e) => {
    e.preventDefault();
    const { email } = data;
    try {
      const { data } = await axios.post("/ResetPassword", {
        email,
      });
      if (data.error) {
        toast.error(data.error);
      } 
      else {
        toast.success(data.success);
        navigate('/login')
      }
    } catch (error) {}
    //
  };
  return (
    <>
      <Navbar
        links={[{ button: true, path: "/login", btn_name: "Login" }]}
      />
      <section className="py-4 py-md-5 mt-5">
        <div className="container py-md-5">
          <div className="row d-flex align-items-center">
            <div className="col-md-6 text-center">
              <img className="img-fluid w-100" src={forgot} />
            </div>
            <div className="col-md-5 col-xl-4 text-center text-md-start">
              <h2 className="display-6 fw-bold mb-4">
                Forgot your <span className="underline">password</span>?
              </h2>
              <p className="text-muted">
                Enter the email associated with your account and we'll send you
                a reset link.
              </p>
              <form method="post" onSubmit={ResetPasswordUser}>
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
                <div className="mb-5">
                  <button className="btn btn-primary shadow" type="submit">
                    Reset password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

