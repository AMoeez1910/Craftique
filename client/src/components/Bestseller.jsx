import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/cart";
import toast from "react-hot-toast";
import { Button } from "../components/ui/button";

const Bestseller = () => {
  const [cartProduct, setCartProduct] = useState();
  const [products, setProducts] = useState([
    {
      products: "",
      quantity: 0,
    },
  ]);
  const [cart, setCart] = useContext(CartContext);
  const processCart = (value) => {
    setCartProduct(value);
    addToCart(value);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  const addToCart = (product) => {
    const productInCart = cart.find((item) => item.product._id === product._id);
    if (productInCart) {
      setCart(
        cart.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      localStorage.setItem(
        "cart",
        JSON.stringify(
          cart.map((item) =>
            item.product._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        )
      );
    } else {
      setCart([...cart, { product, quantity: 1 }]);
      localStorage.setItem(
        "cart",
        JSON.stringify([...cart, { product, quantity: 1 }])
      );
    }
    toast.success("Added to cart");
  };
  return (
    <section className="w-full py-12 md:py-10 lg:py-10">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
          <div className="grid gap-2">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Featured Products
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Discover our top-selling items
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              className="inline-flex h-10 items-center justify-center rounded-md bg-transparent px-6 text-sm font-medium text-gray-900 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:text-gray-50 dark:hover:underline dark:focus-visible:ring-gray-300"
              href="#"
            >
              Bestsellers
            </a>
            <a
              className="inline-flex h-10 items-center justify-center rounded-md bg-transparent px-6 text-sm font-medium text-gray-900 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:text-gray-50 dark:hover:underline dark:focus-visible:ring-gray-300"
              href="#"
            >
              Flash Deals 🔥
            </a>
            <a
              className="inline-flex h-10 items-center justify-center rounded-md bg-transparent px-6 text-sm font-medium text-gray-900 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:text-gray-50 dark:hover:underline dark:focus-visible:ring-gray-300"
              href="#"
            >
              View all
            </a>
          </div>
        </div>
        <div className="mt-8 md:mt-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <div className="bg-white transition-colors h-full">
              <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                <img
                  alt="Product Image"
                  className="object-cover w-full h-full"
                  height={300}
                  src={product.images}
                  style={{
                    aspectRatio: "450/300",
                    objectFit: "cover",
                  }}
                  width={450}
                />
              </div>
              <div className="pt-3 space-y-2 h-full flex flex-col">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-medium">
                    {product.discount === 0 ? (
                      <span className="text-lg">Rs. {product.price}</span>
                    ) : (
                      <div className="flex items-center">
                        <span className="line-through text-sm">
                          Rs. {product.price}
                        </span>
                        <span className="text-lg ml-3">
                          Rs. {product.price - product.discount}
                        </span>
                      </div>
                    )}
                  </span>
                  <Button
                    className="rounded-full px-2 py-2 bg-gray-900 text-gray-50 hover:bg-gray-900/90 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    size="icon"
                    variant="ghost"
                    onClick={() => addToCart(product)}
                  >
                    <ShoppingCartIcon className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Bestseller;
function ShoppingCartIcon(props) {
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
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
