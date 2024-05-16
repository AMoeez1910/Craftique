import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { CartContext } from "../context/cart";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter
} from "./ui/sheet";
import { Button } from "./ui/button"
import { Menu } from "lucide-react";
import Logo from "../assets/text_logo.svg"
import Symbol from "../assets/symbol_logo.svg"

export default function NavBar({ links }) {
  const [isOpen, setIsOpen] = useState(false);
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
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white">
    <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between">
          <NavigationMenuItem className="font-bold flex">
            <a
              rel=""
              href="/"
              className="ml-2 font-bold text-xl flex"
            >
              <img src={Logo} alt="logo" width="150vw" />
            </a>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex md:hidden">
            

            <Sheet
              open={isOpen}
              onOpenChange={setIsOpen}
            >
              <SheetTrigger className="px-2">
                <Menu
                  className="flex md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                >
                  <span className="sr-only">Menu Icon</span>
                </Menu>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    <img src={Symbol} className = "w-10 m-auto" />
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-4 mt-4">
                  
                  <a href="#">Categories</a>
                  <a href="#">Deals</a>
                  <a href="#">What's New</a>
                  <a href="#">Handicrafts</a>
                  <a href="#">Cultural</a>
                  
                  <SheetFooter>
                  {user ? (
                    <div>
                      <p className="text-black" onClick={logout}>
                        <b>Log Out</b>
                      </p>
                    </div>
                  ) : (
                    <div className="mb-5 text-center">
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
                                      <Button>
                                        Create a new account
                                      </Button>
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
                </nav>
              </SheetContent>
            </Sheet>
            
            <div className={`${user ? "block" : "hidden"}`}>
              <div className="flex justify-center items-center cursor-pointer ">
                <Popover>
                <PopoverTrigger>
                      <Button variant="ghost">
                        <div className="flex items-center">
                          <div className="h-8 w-8 flex items-center justify-center rounded-full overflow-hidden">
                            <img
                              src={user?.image}
                              alt="User Avatar"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </div>
                      </Button>
                    </PopoverTrigger>
                  <PopoverContent className="w-40 rounded-sm p-4 text-sm">
                    <Link to="/profile">
                      <p className="cursor-pointer">Profile</p>
                    </Link>
                    {
                    user?.isSeller ? (
                      <Link to="/dash" className="cursor-pointer">
                        <p className="mt-2 mb-4">Seller Dashboard</p>
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
            <div className="flex items-center">
                <Badge badgeContent={cart.length} color="primary">
                  <Link to="/shoppingcart" className="ml-4">
                    <ShoppingCartIcon />
                  </Link>
                </Badge>
              </div>
          </span>

          {/* desktop */}
          <nav className="hidden md:flex gap-4">
            <a href="#">Categories</a>
            <a href="#">Deals</a>
            <a href="#">What's New</a>
            <a href="#">Handicrafts</a>
            <a href="#">Cultural</a>
          </nav>

          <div className="hidden md:flex gap-2">
          {user ? (
              <div className="flex justify-between items-center cursor-pointer">
              <Popover>
              <PopoverTrigger>
                      <Button variant="ghost">
                        <div className="flex items-center">
                          <p className="pr-2">{user?.FirstName}</p>
                          <div className="h-8 w-8 flex items-center justify-center rounded-full overflow-hidden">
                            <img
                              src={user?.image}
                              alt="User Avatar"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </div>
                      </Button>
                    </PopoverTrigger>

                <PopoverContent className="w-40 rounded-sm p-4 text-sm">
                  <Link to="/profile" className="cursor-pointer">
                    <p>Profile</p>
                  </Link>
                  {
                    user?.isSeller ? (
                      <Link to="/dash" className="cursor-pointer">
                        <p className="mt-2 mb-4">Seller Dashboard</p>
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
                              evenIteration ? " " : "bg-white text-black"
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
                    <ShoppingCartIcon className="ml-4 mt-2" />
                  </Link>
                </Badge>
              </div>
            )}
          </div>
        </NavigationMenuList>
      </NavigationMenu>
      </header>
  );
}


