import { AvatarImage, AvatarFallback, Avatar } from "../components/ui/avatar"

const SellerHome =()=> {
  return (
    <>
      <div className="relative h-[50vh] w-full overflow-hidden">
        <img
          alt="Backdrop"
          className="h-full w-full object-cover"
          height={1080}
          src="https://placehold.co/600x400"
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
        <h2 className="text-2xl font-bold mb-6">Featured</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative group overflow-hidden rounded-lg">
            <a className="absolute inset-0 z-10" href="#">
              <span className="sr-only">View</span>
            </a>
            <img
              alt="Product 1"
              className="object-cover w-full h-full"
              height={600}
              src="https://placehold.co/600x400"
              style={{
                aspectRatio: "800/600",
                objectFit: "cover",
              }}
              width={800}
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="relative group overflow-hidden rounded-lg">
              <a className="absolute inset-0 z-10" href="#">
                <span className="sr-only">View</span>
              </a>
              <img
                alt="Product 2"
                className="object-cover w-full h-60"
                height={300}
                src="https://placehold.co/600x400"
                style={{
                  aspectRatio: "400/300",
                  objectFit: "cover",
                }}
                width={400}
              />
            </div>
            <div className="relative group overflow-hidden rounded-lg">
              <a className="absolute inset-0 z-10" href="#">
                <span className="sr-only">View</span>
              </a>
              <img
                alt="Product 3"
                className="object-cover w-full h-60"
                height={300}
                src="https://placehold.co/600x400"
                style={{
                  aspectRatio: "400/300",
                  objectFit: "cover",
                }}
                width={400}
              />
            </div>
            <div className="relative group overflow-hidden rounded-lg">
              <a className="absolute inset-0 z-10" href="#">
                <span className="sr-only">View</span>
              </a>
              <img
                alt="Product 4"
                className="object-cover w-full h-60"
                height={300}
                src="https://placehold.co/600x400"
                style={{
                  aspectRatio: "400/300",
                  objectFit: "cover",
                }}
                width={400}
              />
            </div>
            <div className="relative group overflow-hidden rounded-lg">
              <a className="absolute inset-0 z-10" href="#">
                <span className="sr-only">View</span>
              </a>
              <img
                alt="Product 5"
                className="object-cover w-full h-60"
                height={300}
                src="https://placehold.co/600x400"
                style={{
                  aspectRatio: "400/300",
                  objectFit: "cover",
                }}
                width={400}
              />
            </div>
          </div>
        </div>
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2">John Doe</h3>
            <div className="flex items-center gap-2 mb-4">
              <LocateIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-500 dark:text-gray-400">New York, USA</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              John Doe is a passionate seller who specializes in handcrafted home decor items. With an eye for detail
              and a love for sustainable materials, he creates unique and beautiful pieces that add a touch of elegance
              to any space.
            </p>
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
function LocateIcon(props) {
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
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
    </svg>
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