
import { Button } from "../components/ui/button"
import BestsellerCard from "./BestSellerCard"
import { useNavigate } from 'react-router-dom';
const Bestseller = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full py-12 md:py-10 lg:py-10">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
          <div className="grid gap-2">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Featured Products</h2>
            <p className="text-gray-500 dark:text-gray-400">Discover our top-selling items</p>
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
            <Button
              className="inline-flex h-10 items-center justify-center rounded-md"
              onClick={() => navigate("/products")}
            >
              View all
            </Button>
          </div>
        </div>
        <div className="mt-8 md:mt-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          
          <BestsellerCard />
        </div>
      </div>
    </section>
  )
}
export default Bestseller
