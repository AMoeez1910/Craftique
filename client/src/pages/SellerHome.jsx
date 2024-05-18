import { useState, useEffect } from "react";
import { AvatarImage, AvatarFallback, Avatar } from "../components/ui/avatar"
import { Button } from "../components/ui/button"
import axios from "axios";
import { useParams } from 'react-router-dom';
import { set } from "date-fns";
const SellerHome = () => {
  const { id } = useParams();
  const [seller, setSeller] = useState([]);
  useEffect(() => {
    const fetchProductData = async (id) => {
      const response = await axios.get(`/seller/${id}`);
      setSeller(response.data);
    }
    fetchProductData(id)
  }, [])
  return (
    <>
      {console.log(seller)}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <img
          alt="Backdrop"
          className="h-full w-full object-cover"
          height={1080}
          src={seller[0]?.brand.image}
          style={{
            aspectRatio: "1920/1080",
            objectFit: "cover",
          }}
          width={1920}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Avatar className="h-24 w-24 border-4 border-white dark:border-gray-950">
            <AvatarImage alt="Seller Avatar" src="/placeholder-user.jpg" />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="container px-4 md:px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 mb-10">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Featured Products</h2>
          <p className="text-gray-500 dark:text-gray-400">
          </p>
          <Button
            className="ml-auto shrink-0 bg-gray-900 text-gray-50 hover:bg-gray-900/90 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90"
            variant="outline"
          >
            View all products
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative group overflow-hidden rounded-lg">
            <a className="absolute inset-0 z-10" href="#">
              <span className="sr-only">View</span>
            </a>
            <img
              alt="Product 1"
              className="object-cover w-full h-full"
              height={600}
              src={seller[0]?.images[0]}
              style={{
                aspectRatio: "800/600",
                objectFit: "cover",
              }}
              width={800}
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            {
              seller?.slice(1,5).map((product, index) => (
                <div className="relative group overflow-hidden rounded-lg">
                  <a className="absolute inset-0 z-10" href="#">
                    <span className="sr-only">View</span>
                  </a>
                  <img
                    alt="Product 2"
                    className="object-cover w-full h-60"
                    height={300}
                    src={product.images[0]}
                    style={{
                      aspectRatio: "400/300",
                      objectFit: "cover",
                    }}
                    width={400}
                  />
                </div>
              ))
              
            }
            
                
          </div>
        </div>
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2">{seller[0]?.brand.name}</h3>
            <div className="flex items-center gap-2 mb-4">
              <MailIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <p className="text-gray-500 dark:text-gray-400">
                {seller[0]?.brand.email}
              </p>
            </div>
            <p className="text-gray-500 dark:text-gray-400">{seller[0]?.brand.description}</p>

          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Reviews</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage alt="Reviewer 1" src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-0.5">
                      <StarIcon className="w-5 h-5 fill-primary" />
                      <StarIcon className="w-5 h-5 fill-primary" />
                      <StarIcon className="w-5 h-5 fill-primary" />
                      <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                      <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">2 days ago</span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    I recently purchased a beautiful vase from John's shop and I'm absolutely in love with it. The
                    craftsmanship is impeccable and the quality is top-notch. Highly recommended!
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage alt="Reviewer 2" src="/placeholder-user.jpg" />
                  <AvatarFallback>SA</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-0.5">
                      <StarIcon className="w-5 h-5 fill-primary" />
                      <StarIcon className="w-5 h-5 fill-primary" />
                      <StarIcon className="w-5 h-5 fill-primary" />
                      <StarIcon className="w-5 h-5 fill-primary" />
                      <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">1 week ago</span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    I'm so impressed with the quality of the products from John's shop. The attention to detail and the
                    care put into each item is truly remarkable. I'll definitely be a repeat customer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default SellerHome
function MailIcon(props) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 2C0.447715 2 0 2.44772 0 3V12C0 12.5523 0.447715 13 1 13H14C14.5523 13 15 12.5523 15 12V3C15 2.44772 14.5523 2 14 2H1ZM1 3L14 3V3.92494C13.9174 3.92486 13.8338 3.94751 13.7589 3.99505L7.5 7.96703L1.24112 3.99505C1.16621 3.94751 1.0826 3.92486 1 3.92494V3ZM1 4.90797V12H14V4.90797L7.74112 8.87995C7.59394 8.97335 7.40606 8.97335 7.25888 8.87995L1 4.90797Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
  )
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
  )
}