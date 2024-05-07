import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import login from "../assets/signup.png";
import { UserContext } from "../context/userContext";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import google from "../assets/google.svg";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Label } from "@radix-ui/react-label";

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
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  return (
    <>
      {loading ? (
        <div className="text-center">
          <p>Loading!!!</p>
        </div>
      ) : (
        <div>
          <Navbar
            links={[{ button: true, path: "/Register", btn_name: "Register" }]}
          />
          <div className="py-5 flex justify-center items-center">
            <div className="w-1/2">
              <img className="w-full" src={login} />
            </div>
            <div className="w-1/2">
              <div className="w-1/2">
                <Form>
                  <FormItem>
                    <div className="w-full">
                      <Label htmlFor="inEmail">Email</Label>
                      <Input
                        id="inEmail"
                        type="email"
                        className="border-1 rounded-sm h-10"
                      />
                    </div>
                  </FormItem>
                  <FormItem>
                    <div className="w-full">
                      <Label htmlFor="inPass">Password</Label>
                      <Input
                        id="inPass"
                        type="password"
                        className="border-1 rounded-sm h-10"
                      />
                    </div>
                  </FormItem>
                  <FormItem>
                    <div className="flex justify-between mt-2">
                      <div>
                        <Checkbox id="remember" />
                        <Label htmlFor="remember" className="ml-2">
                          Remember me
                        </Label>
                      </div>
                      <div>
                        <p className="text-sm cursor-pointer"><u><b>Forgot Password?</b></u></p>
                      </div>
                    </div>
                  </FormItem>
                  <FormItem>
                    <div className="w-full mb-3">
                      <Button className="w-full bg-black rounded-sm h-10">
                        Log In
                      </Button>
                    </div>
                  </FormItem>
                  <div className="flex justify-center items-center">
                    <p className="m-auto text-sm">OR</p>
                  </div>
                  <FormItem>
                    <div className="w-full mt-3">
                      <Button className="w-full bg-white text-black border-1 rounded-sm h-10">
                        <img src={google} alt="Google" className="h-7 mr-2" />
                        Log In with Google
                      </Button>
                    </div>
                  </FormItem>
                </Form>
              </div>
            </div>
            {/* <div className="container py-md-5">
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
                  <form
                    method="post"
                    data-bs-theme="light"
                    onSubmit={LoginUser}
                  >
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
                        <button
                          className="btn btn-primary shadow btn-block"
                          type="submit"
                        >
                          Log in
                        </button>
                      </div>
                      <div className="card">
                        <div className="card-body">
                          <a
                            className="btn btn-block"
                            href="http://localhost:8000/auth/google/callback"
                            role="button"
                          >
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
            </div> */}
          </div>
        </div>
      )}
    </>
  );
}
document.body.className = "overflow-y-hidden";
