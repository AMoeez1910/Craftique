import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { CartContext } from "../context/cart";
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";
import toast from "react-hot-toast";

export const Shoppingcart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useContext(CartContext);
  const { user } = useContext(UserContext);
  const [shipping, setshipping] = useState();
  const [total, setTotal] = useState();
  useEffect(() => {
    const total = cart.reduce(
      (acc, item) =>
        acc + (item.product.price - item.product.discount) * item.quantity,
      0
    );
    setTotal(total);
    if (total >= 1000) {
      setshipping(0);
    } else {
      setshipping(50);
    }
  }, [cart]);
  const removeFromCart = (product) => {
    const productInCart = cart.find((item) => item.product._id === product._id);

    if (productInCart.quantity === 1) {
      setCart(cart.filter((item) => item.product._id !== product._id));
      localStorage.setItem(
        "cart",
        JSON.stringify(cart.filter((item) => item.product._id !== product._id))
      );
    } else {
      setCart(
        cart.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
      localStorage.setItem(
        "cart",
        JSON.stringify(
          cart.map((item) =>
            item.product._id === product._id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        )
      );
    }
  };
  const addToCart = (product) => {
    setCart(
      cart.map((item) =>
        item.product._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };
  const removeAll = (product) => {
    setCart(cart.filter((item) => item.product._id !== product._id));
    localStorage.setItem(
      "cart",
      JSON.stringify(cart.filter((item) => item.product._id !== product._id))
    );
  };
  const placeOrder = async () => {
    try {
      if (!user) {
        navigate("/login");
        toast.error("Please login to place order");
      }
      if (!user.address.shippingAddress) {
        navigate("/profile");
        toast.error("Please add shipping address to place order");
      } else {
        await axios.post("/order", {
          cart,
          total: total + shipping,
          user: user._id,
        });
        toast.success("Order placed successfully");
        setCart([]);
        localStorage.removeItem("cart");
        navigate("/");
      }
    } catch (err) {
      toast.error(err);
    }
  };
  const subtotal = () => {
    let total = 0;
    cart.map((item) => {
      total += item.product.price * item.quantity;
    });
    return total;
  };
  const discount = () => {
    let total = 0;
    cart.map((item) => {
      total += item.product.discount * item.quantity;
    });
    return total;
  };
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
          { button: true, path: "/Register", btn_name: "Register" },
        ]}
      />
      <main className="container mx-auto my-8 grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
        <div>
          <h1 className="mb-4 text-2xl font-bold">Your Cart</h1>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                  key={item.product._id}
                >
                  <img
                    src={item.product.images}
                    alt={item.product.name}
                    className="rounded-md"
                    height={80}
                    style={{
                      aspectRatio: "80/80",
                      objectFit: "cover",
                    }}
                    width={80}
                  />
                  <div className="flex-1">
                    <h3 className="text-md font-medium">{item.product.name}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => removeFromCart(item.product)}
                    >
                      <MinusIcon className="h-4 w-4" />
                    </Button>
                    <span className="text-lg font-medium">{item.quantity}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => addToCart(item.product)}
                    >
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                    <div className="text-lg font-medium">
                      ${item.product.price * item.quantity}
                    </div>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => removeAll(item.product)}
                    >
                      <XIcon className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {cart.length === 0 ? (
          ""
        ) : (
          <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-bold">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-medium">${subtotal()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Discount</span>
                <span className="font-medium text-green-500">
                  -${discount()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span className="font-medium">${shipping}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">Total</span>
                <span className="text-lg font-bold">
                  ${subtotal() + shipping - discount()}
                </span>
              </div>
            </div>
            <Button className="mt-6 w-full" onClick={() => placeOrder()}>
              Place Order
            </Button>
          </div>
        )}
      </main>
    </>
  );
};

const XIcon = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
};
