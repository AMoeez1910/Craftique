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
} from "./ui/sheet";
import { Button } from "./ui/button"
import { Menu } from "lucide-react";
import Logo from "../assets/text_logo.svg"
import Symbol from "../assets/symbol_logo.svg"


export const NavbarLand = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (<>
      <div className="bg-gray-900 text-white py-1 px-4 text-center">
        <p className="text-sm">Free delivery on orders above PKR 1000</p>
      </div>
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white">
      
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
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
                  
                  <Button>
                    Login
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
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
          <Button>
            Login
          </Button>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
    </>
  );
};
export default NavbarLand;