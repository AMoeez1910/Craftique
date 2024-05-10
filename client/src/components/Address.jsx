import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Form, FormItem } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "../components/ui/button";

export default function Address(props) {
  const navigate = useNavigate();
  const [data, setData] = useState({
    shippingAddress: "",
    shippingCity: "",
    shippingCountry: "",
    billingAddress: "",
    billingCity: "",
    billingCountry: "",
  });
  useEffect(() => {
    setData({
      shippingAddress: props.addressData.shippingAddress.address,
      shippingCity: props.addressData.shippingAddress.city,
      shippingCountry: props.addressData.shippingAddress.country,
      billingAddress: props.addressData.billingAddress.address,
      billingCity: props.addressData.billingAddress.city,
      billingCountry: props.addressData.billingAddress.country,
    });
  }, [props]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`/update-user-address/${props.id}`, {
        data,
      });
      if (response.data.success) {
        toast.success(response.data.success);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error(response.data.error);
      }
      console.log(data);
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div>
      <h3>Address</h3>
      <div className="flex">
        <div className="w-1/2 mr-5">
          <h6 className="my-4">Shipping Address</h6>
          <Form>
            <FormItem>
              <div className="mt-3">
                <Label htmlFor="shipAddress">Address</Label>
                <Input
                  id="shipAddress"
                  type="text"
                  className="border-1 rounded-sm h-10"
                  value={props.addressData.shippingAddress.address}
                  onChange={(e) =>
                    setData({ ...data, shippingAddress: e.target.value })
                  }
                />
              </div>
            </FormItem>
            <div className="flex mt-3">
              <FormItem>
                <div className="mr-2">
                  <Label htmlFor="shipCity">City</Label>
                  <Input
                    id="shipCity"
                    type="text"
                    className="border-1 rounded-sm h-10"
                    value={props.addressData.shippingAddress.city}
                    onChange={(e) =>
                      setData({ ...data, shippingCity: e.target.value })
                    }
                  />
                </div>
              </FormItem>
              <FormItem>
                <div className="ml-2">
                  <Label htmlFor="shipCountry">Country</Label>
                  <Input
                    id="shipCountry"
                    type="text"
                    className="border-1 rounded-sm h-10"
                    value={props.addressData.shippingAddress.country}
                    onChange={(e) =>
                      setData({ ...data, shippingCountry: e.target.value })
                    }
                  />
                </div>
              </FormItem>
            </div>
          </Form>
        </div>
        <div className="w-1/2 ml-5">
          <h6 className="my-4">Billing Address</h6>
          <Form>
            <FormItem>
              <div className="mt-3">
                <Label htmlFor="billAddress">Address</Label>
                <Input
                  id="billAddress"
                  type="text"
                  className="border-1 rounded-sm h-10"
                  value={props.addressData.billingAddress.address}
                  onChange={(e) =>
                    setData({ ...data, billingAddress: e.target.value })
                  }
                />
              </div>
            </FormItem>
            <div className="flex mt-3">
              <FormItem>
                <div className="mr-2">
                  <Label htmlFor="billCity">City</Label>
                  <Input
                    id="billCity"
                    type="text"
                    className="border-1 rounded-sm h-10"
                    value={props.addressData.billingAddress.city}
                    onChange={(e) =>
                      setData({ ...data, billingCity: e.target.value })
                    }
                  />
                </div>
              </FormItem>
              <FormItem>
                <div className="ml-2">
                  <Label htmlFor="billCountry">Country</Label>
                  <Input
                    id="billCountry"
                    type="text"
                    className="border-1 rounded-sm h-10"
                    value={props.addressData.billingAddress.country}
                    onChange={(e) =>
                      setData({ ...data, billingCountry: e.target.value })
                    }
                  />
                </div>
              </FormItem>
            </div>
          </Form>
        </div>
      </div>
      <div className="mt-5 flex justify-center">
        <Button className="bg-black w-3/5" type="submit" onClick={handleSubmit}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
document.body.className = "overflow-y-hidden";
