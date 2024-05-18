import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { Input } from "../components/ui/input";
import { AvatarImage, AvatarFallback, Avatar } from "../components/ui/avatar";
import NavBar from "../components/Navbar";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/cart";
import { UserContext } from "../context/userContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Component() {
  const [data, setData] = useState();
  const { id } = useParams();
  const [cart, setCart] = useContext(CartContext);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState({ rating: 0, review: "" });
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`/products/${id}`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
      navigate("/*");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const submitReview = async () => {
    if (reviews.rating === 0) {
      toast.error("Please fill all the fields");
    } else {
      try {
        const totalRating =
          data.reviews.reduce((acc, review) => acc + review.rating, 0) +
          reviews.rating;
        const totalReviews = data.reviews.length + 1;
        const averageRating = totalRating / totalReviews;
        const avgCount = Math.round(averageRating);
        const response = await axios.post("/product-reviews", {
          reviews,
          id: user._id,
          product: id,
          avgRating: avgCount,
        });
        toast.success(response.data.success);
        setReviews({ rating: 0, review: "" });
        fetchProducts();
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    }
  };

  const addToCart = (product) => {
    const productInCart = cart.find((item) => item.product._id === product._id);
    if (productInCart) {
      setCart(
        cart.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
      localStorage.setItem(
        "cart",
        JSON.stringify(
          cart.map((item) =>
            item.product._id === product._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        )
      );
    } else {
      setCart([...cart, { product, quantity: quantity }]);
      localStorage.setItem(
        "cart",
        JSON.stringify([...cart, { product, quantity: quantity }])
      );
    }
    toast.success("Added to cart");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBar
        links={[
          { button: true, path: "/login", btn_name: "Login" },
          { button: true, path: "/register", btn_name: "Register" },
        ]}
      />
      <div className="h-[93vh] flex justify-center items-center">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
          <div className="grid gap-4 md:gap-10 items-start">
            <img
              alt="Product Image"
              className="object-cover h-[60vh] border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
              src={data.product.images[0]}
            />
          </div>
          <div className="grid gap-4 md:gap-10 items-start">
            <div className="grid gap-2">
              <h1 className="font-bold text-3xl lg:text-4xl">
                {data.product.name}
              </h1>
              <div>
                <p>{data.product.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-0.5">
                  {(() => {
                    const averageRating =
                      data.reviews.reduce(
                        (acc, review) => acc + review.rating,
                        0
                      ) / data.reviews.length;
                    const starCount = Math.round(averageRating);
                    const stars = [];

                    for (let i = 0; i < 5; i++) {
                      if (i < starCount) {
                        stars.push(
                          <StarIcon className="w-5 h-5 fill-primary" key={i} />
                        );
                      } else {
                        stars.push(
                          <StarIcon
                            className="w-5 h-5 fill-muted stroke-muted-foreground"
                            key={i}
                          />
                        );
                      }
                    }
                    return stars;
                  })()}
                  ({data.reviews.length})
                </div>
                <div className="text-4xl font-bold">Rs. {data.product.price}</div>
              </div>
            </div>
            <div className="grid gap-4 md:gap-10">
              <div className="grid gap-2">
                <Label className="text-base" htmlFor="quantity">
                  Quantity
                </Label>
                <div className="flex items-center gap-2">
                  <Button
                    className="h-8 w-8"
                    size="icon"
                    variant="outline"
                    onClick={() =>
                      quantity > 1 ? setQuantity(quantity - 1) : ""
                    }
                  >
                    <MinusIcon className="h-4 w-4" />
                    <span className="sr-only">Decrease quantity</span>
                  </Button>
                  <span>{quantity}</span>
                  <Button
                    className="h-8 w-8"
                    size="icon"
                    variant="outline"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <PlusIcon className="h-4 w-4" />
                    <span className="sr-only">Increase quantity</span>
                  </Button>
                </div>
              </div>
              <Button size="lg" onClick={() => addToCart(data.product)}>Add to cart</Button>
            </div>
          </div>
        </div>
      </div>
      <Separator />
      <div className="mx-auto px-4 md:px-6 max-w-2xl grid gap-12">
        <div className="flex flex-col mt-8 -mb-3">
          <div className="flex gap-4 items-start">
            <div className="grid gap-0.5 text-sm">
              <h3 className="font-semibold">Write a review</h3>
            </div>
            <div className="flex items-center gap-0.5 ml-auto">
              <StarIcon className="w-5 h-5 fill-primary cursor-pointer" />
              <StarIcon className="w-5 h-5 fill-primary cursor-pointer" />
              <StarIcon className="w-5 h-5 fill-primary cursor-pointer" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground cursor-pointer" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground cursor-pointer" />
            </div>
          </div>
          <div className="text-sm leading-loose text-gray-500 dark:text-gray-400 flex justify-between pt-3">
            <Input
              className="p-4 w-4/5 focus:outline-none"
              placeholder="Write your review..."
            />
            <Button className="w-1/5 ml-5">Submit Review</Button>
          </div>
        </div>
        <Separator />
        <div className="flex gap-4">
          <Avatar className="w-10 h-10 border">
            <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="grid gap-4">
            <div className="flex gap-4 items-start">
              <div className="grid gap-0.5 text-sm">
                <h3 className="font-semibold">Sarah Johnson</h3>
                <time className="text-sm text-gray-500 dark:text-gray-400">
                  2 days ago
                </time>
              </div>
              <div className="flex items-center gap-0.5 ml-auto">
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              </div>
            </div>
            <div className="text-sm leading-loose text-gray-500 dark:text-gray-400">
              <p>
                I've been experimenting with my LuminaCook Multi-Function Air
                Fryer for a few weeks now, and it's been a versatile addition to
                my kitchen. It's great for making crispy fries, chicken wings,
                and even some healthier options.
              </p>
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex gap-4">
          <Avatar className="w-10 h-10 border">
            <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="grid gap-4">
            <div className="flex gap-4 items-start">
              <div className="grid gap-0.5 text-sm">
                <h3 className="font-semibold">Alex Smith</h3>
                <time className="text-sm text-gray-500 dark:text-gray-400">
                  3 weeks ago
                </time>
              </div>
              <div className="flex items-center gap-0.5 ml-auto">
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              </div>
            </div>
            <div className="text-sm leading-loose text-gray-500 dark:text-gray-400">
              <p>
                I recently purchased the SparkleShine Home Cleaning Robot, and
                it has been a game-changer in my life. I used to spend hours
                every weekend cleaning my house, but now I can simply turn on
                this little robot and let it do the work.
              </p>
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex gap-4 mb-10">
          <Avatar className="w-10 h-10 border">
            <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="grid gap-4">
            <div className="flex gap-4 items-start">
              <div className="grid gap-0.5 text-sm">
                <h3 className="font-semibold">Emily Parker</h3>
                <time className="text-sm text-gray-500 dark:text-gray-400">
                  2 days ago
                </time>
              </div>
              <div className="flex items-center gap-0.5 ml-auto">
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              </div>
            </div>
            <div className="text-sm leading-loose text-gray-500 dark:text-gray-400">
              <p>
                The battery life is impressive, lasting me for long-haul flights
                without any issues. They are comfortable to wear for extended
                periods, and I appreciate the sleek design. Worth every penny.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function MinusIcon(props) {
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
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function StarIcon(props) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
