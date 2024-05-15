import React from "react";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { Sheet, SheetContent, SheetFooter, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { CartContext } from "../context/cart";
export default function NavBar({ links }) {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [cart] = useContext(CartContext);
  const logout = () => {
    axios
      .get("/logout")
      .then((res) => {
        if (res.data && res.data.Status === "Success") {
          setUser(null);
          toast.success("Successfully logged out");
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <nav className="px-3 sm:px-6 lg:px-8 z-10 text-gray-700">
        {/* Mobile Device Start*/}
        <div>
          <div className="pt-3 flex justify-between items-center select-none lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost">
                  <FontAwesomeIcon icon={faBars} className="h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">

                <div className="py-3">
                  {links.map((link, index) => {
                    if (!link.button) {
                      return (
                        <div className="p-2" key={index}>
                          <Link to={link.href}>{link.name}</Link>
                          {/* Add icons with text */}
                        </div>
                      );
                    }
                  })}
                </div>
                <hr className="border-gray-800 border-1 my-4" />
                <SheetFooter>
                  {user ? (
                    <div>
                      <p className="text-black" onClick={logout}>
                        <b>Log Out</b>
                      </p>
                    </div>
                  ) : (
                    <div className="mb-5">
                      <div className="py-2">
                        {links.map((link, index) => {
                          if (link.button) {
                            return (
                              <div className="">
                                <Link to={link.path} key={index}>
                                  <p className="h-9">
                                    {link.btn_name === "Login" ? (
                                      <p>
                                        Existing User?{" "}
                                        <p className="text-black inline">
                                          <b>Click here to Log In</b>
                                        </p>
                                      </p>
                                    ) : (
                                      <p className="text-black">
                                        <b>Create a new account</b>
                                      </p>
                                    )}
                                  </p>
                                </Link>
                              </div>
                            );
                          }
                        })}
                      </div>
                    </div>
                  )}
                </SheetFooter>
              </SheetContent>
            </Sheet>
            <div
              className={`flex text-white text-lg font-mono hover:scale-110 transform transition-transform duration-500 justify-end h-7 ${
                user ? "" : "pr-4"
              }`}
            >
              <img src={logo} alt="Logo" />
            </div>
            <div className={`${user ? "block" : "hidden"}`}>
              <div className="flex justify-center items-center cursor-pointer">
                <Popover>
                <PopoverTrigger>
                      <Button variant="ghost">
                        <div className="flex items-center">
                          <p className="pr-2">{user.FirstName}</p>
                          <div className="h-8 w-8 flex items-center justify-center rounded-full overflow-hidden">
                            <img
                              src={user.image}
                              alt="User Avatar"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </div>
                      </Button>
                    </PopoverTrigger>
                  <PopoverContent className="w-40 border-1 rounded-sm py-3 pb-0">
                    <Link to="/profile">
                      <p className="cursor-pointer">Profile</p>
                    </Link>
                    {
                    user?.isSeller ? (
                      <Link to="/dash" className="cursor-pointer">
                        <p>Seller Dashboard</p>
                      </Link>
                    ):(
                      <Link to="/seller-register" className="cursor-pointer">
                        <p>Become a Seller</p>
                      </Link>
                    )}
                    <hr className="border-gray-800 border-1 my-2" />
                    <p className="cursor-pointer pt-1" onClick={logout}>
                      <b>Log Out</b>
                    </p>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile Device End */}
        {/* Other Devices Start */}
        <div className="hidden lg:block">
          <div className="flex items-center p-4 select-none justify-around">
            <img src={logo} alt="logo" className="h-7" />
            <div>
              <ul className="flex space-x-1">
                {links.map((link, index) => (
                  <li className="p-2" key={index}>
                    <a className="hover:text-gray-900" href={link.href}>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {user ? (
              <div className="flex justify-between items-center cursor-pointer">
              <Popover>
              <PopoverTrigger>
                      <Button variant="ghost">
                        <div className="flex items-center">
                          <p className="pr-2">{user.FirstName}</p>
                          <div className="h-8 w-8 flex items-center justify-center rounded-full overflow-hidden">
                            <img
                              src={user.image}
                              alt="User Avatar"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </div>
                      </Button>
                    </PopoverTrigger>

                <PopoverContent className="w-40 rounded-sm p-3">
                  <Link to="/profile" className="cursor-pointer">
                    <p>Profile</p>
                  </Link>
                  {
                    user?.isSeller ? (
                      <Link to="/dash" className="cursor-pointer">
                        <p>Seller Dashboard</p>
                      </Link>
                    ):(
                      <Link to="/seller-register" className="cursor-pointer">
                        <p>Become a Seller</p>
                      </Link>
                    )}
                  <hr className="border-gray-800 border-1 my-2" />
                  <p className="cursor-pointer" onClick={logout}>
                    <b>Log Out</b>
                  </p>
                </PopoverContent>
              </Popover>
              <div className="flex items-center">
                <Badge badgeContent={cart.length} color="primary">
                  <Link to="/shoppingcart" className="ml-4">
                    <ShoppingCartIcon />
                  </Link>
                </Badge>
              </div>
              </div>
            ) : (
              <div className="flex">
                {links.map((link, index) => {
                  if (link.button) {
                    const evenIteration = index % 2 === 0;
                    return (
                      <div>
                        <Link to={link.path} key={index}>
                          <Button
                            className={`h-9 w-20 rounded-md transition duration-500 ease-in-out transform hover:-translate-y-1  ${
                              evenIteration ? "bg-black text-white" : ""
                            }`}
                          >
                            {link.btn_name}
                          </Button>
                        </Link>
                      </div>
                    );
                  }
                })}
                <Badge badgeContent={cart.length} color="primary">
                <Link to="/shoppingcart">
                    <ShoppingCartIcon className="ml-4 mt-2"/>
                </Link>
                </Badge>
              </div>
            )}
          </div>
        </div>
        {/* Other Devices End */}
      </nav>
    </>
  );
}
