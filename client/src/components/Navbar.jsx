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

export default function NavBar({ links }) {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
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
              <SheetContent side="bottom">
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
                                      <p className="text-black">
                                        <b>Create a new account</b>
                                      </p>
                                    ) : (
                                      <p>
                                        Existing User?{" "}
                                        <p className="text-black inline">
                                          <b>Click here to register</b>
                                        </p>
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
            <div className="flex text-white text-lg font-mono hover:scale-110 transform transition-transform duration-500 justify-end h-7 pr-3">
              <img src={logo} alt="Logo" />
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
              <a className="flex justify-center items-center" href="/profile">
                <p className="m-auto pr-2">Muhammad Umer Ali</p>{" "}
                {/* user.name bla bla */}
                <FontAwesomeIcon
                  icon={faUser}
                  className="h-4 border-1 p-2 rounded-full border-gray-500"
                />
              </a>
            ) : (
              <div className="flex">
                {links.map((link, index) => {
                  if (link.button) {
                    const evenIteration = index % 2 === 0;
                    return (
                      <div>
                        <Link to={link.path} key={index}>
                          <button
                            className={`h-9 w-20 rounded-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:text-gray-900 ${
                              evenIteration ? "bg-black text-white" : ""
                            }`}
                          >
                            {link.btn_name}
                          </button>
                        </Link>
                      </div>
                    );
                  }
                })}
              </div>
            )}
          </div>
        </div>
        {/* Other Devices End */}
      </nav>
    </>
  );
}