import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import forgot from "../assets/forgot.png";
import { Form, FormItem } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "../components/ui/button";

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
      } else {
        toast.success(data.success);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar links={[{ button: true, path: "/login", btn_name: "Login" }]} />
      {/* Large Screens start */}
      <div className="hidden lg:block overflow-hidden">
        <div className="py-5 flex justify-center items-center">
          <div className="w-1/2">
            <img className="w-full" src={forgot} />
          </div>
          <div className="w-1/2 mb-10">
            <div className="w-1/2">
              <form method="post" onSubmit={ResetPasswordUser}>
                <Form>
                  <h3 className="mb-5">Reset Password</h3>
                  <FormItem>
                    <div className="w-full">
                      <Label htmlFor="eail">
                        Enter the email associated with your account and we'll
                        send you a reset link.
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        className="border-1 rounded-sm h-10"
                        value={data.email}
                        onChange={(e) =>
                          setData({ ...data, email: e.target.value })
                        }
                      />
                    </div>
                  </FormItem>
                  <FormItem>
                    <div className="my-3">
                      <Button
                        className="w-full bg-black rounded-sm h-10"
                        type="submit"
                      >
                        Reset Password
                      </Button>
                    </div>
                  </FormItem>
                </Form>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Large Screens end */}
      {/* Mobile Screens start */}
      <div className="lg:hidden">
        <div className="flex flex-col justify-center items-center h-screen w-screen pb-24">
          <form method="post" onSubmit={ResetPasswordUser} className="w-80">
            <Form>
              <h3 className="mb-5">Reset Password</h3>
              <FormItem>
                <div className="w-full">
                  <Label htmlFor="eail">
                    Enter the email associated with your account and we'll send
                    you a reset link.
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className="border-1 rounded-sm h-10"
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  />
                </div>
              </FormItem>
              <FormItem>
                <div className="my-3">
                  <Button
                    className="w-full bg-black rounded-sm h-10"
                    type="submit"
                  >
                    Reset Password
                  </Button>
                </div>
              </FormItem>
            </Form>
          </form>
        </div>
      </div>
      {/* Mobile Screens end */}
    </>
  );
}
