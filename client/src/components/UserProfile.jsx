import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Form, FormItem } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "../components/ui/button";
import pfp from "../assets/user_pfp.png";

export default function UserProfile(props) {
  const navigate = useNavigate();
  const [data, setData] = useState({
    FirstName: "",
    LastName: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setData((prevVal) => ({
      ...prevVal,
      FirstName: props.FirstName,
      LastName: props.LastName,
    }));
  }, [props]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`/update-user-profile/${props.id}`, {
        data,
      });
      if (response.data.success) {
        toast.success(response.data.success);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const fullName = `${props.FirstName} ${props.LastName}`;
  const previewImage = (event) => {
    const input = event.target;
    const preview = document.getElementById("preview");

    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        preview.src = e.target.result;
        preview.classList.remove("hidden");
      };

      reader.readAsDataURL(input.files[0]);
    }
  };
  return (
    <div>
      <h3 className="text-dark mb-4 text-xl">
        Profile
      </h3>
      <div className="flex justify-between">
        <div className="w-2/3">
          <Form>
            <FormItem>
              <div className="w-4/5 pb-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  className="border-2 border-gray-100 rounded-sm h-10 shadow-sm"
                  placeholder={props.email}
                  disabled
                />
              </div>
            </FormItem>
            <FormItem>
              <div className="w-4/5 pb-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="name"
                  className="border-2 border-gray-100 rounded-sm h-10 shadow-sm"
                  placeholder={fullName}
                  disabled
                />
              </div>
            </FormItem>
            <FormItem>
              <div className="w-4/5">
                <Label htmlFor="contact">Contact</Label>
                <Input
                  id="contact"
                  type="contact"
                  className="border-2 border-gray-100 rounded-sm h-10 shadow-sm"
                  placeholder={props.phone}
                  disabled
                />
              </div>
            </FormItem>
          </Form>
        </div>
        <div className="w-1/3 flex flex-col items-center">
          <Label>Profile Photo</Label>
          <Label htmlFor="picture" className="block cursor-pointer">
            <img
              id="preview"
              className="h-32 w-32"
              src={pfp}
              alt="Selected Image"
            />
          </Label>
          <Input
            id="picture"
            type="file"
            onChange={previewImage}
            className="border-1 rounded-sm border-gray-100 cursor-pointer h-10 m-0 mt-4 p-2 border-2"
            accept="image/*"
          />
        </div>
      </div>
      <div className="pt-5">
        <h3 className="text-dark mb-4 text-xl">Change Password</h3>
        <div className="">
          <form>
            <Form>
              <div className="flex">
                <div className="w-1/2">
                  <FormItem>
                    <div className="w-4/5">
                      <Label htmlFor="newPass">New Password</Label>
                      <Input
                        id="newPass"
                        type="password"
                        className="bborder-2 border-gray-100 rounded-sm h-10 shadow-sm"
                        value={data.newPassword}
                        onChange={(e) =>
                          setData({ ...data, newPassword: e.target.value })
                        }
                      />
                    </div>
                  </FormItem>
                </div>
                <div className="w-1/2">
                  <FormItem>
                    <div className="w-4/5">
                      <Label htmlFor="conPass">Confirm Password</Label>
                      <Input
                        id="conPass"
                        type="password"
                        className="border-2 border-gray-100 rounded-sm h-10 shadow-sm"
                        value={data.confirmPassword}
                        onChange={(e) =>
                          setData({ ...data, confirmPassword: e.target.value })
                        }
                      />
                    </div>
                  </FormItem>
                </div>
              </div>
            </Form>
          </form>
        </div>
      </div>
      <div className="pt-8 flex justify-center">
        <Button
          className="w-full bg-black rounded-sm h-10"
          onClick={handleSubmit}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
document.body.className = "overflow-y-hidden";
