import { Button } from "../components/ui/button"
const BestsellerCard = () => {
    return (
        <div className="bg-white transition-colors h-full">
            <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
              <img
                alt="Product Image"
                className="object-cover w-full h-full"
                height={300}
                src="https://placehold.co/320x240"
                style={{
                  aspectRatio: "450/300",
                  objectFit: "cover",
                }}
                width={450}
              />
            </div>
            <div className="pt-3 space-y-2 h-full flex flex-col">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Minimalist Ceramic Mug</h3>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-base font-medium">$24.99</span>
                <Button
                  className="rounded-full px-2 py-2 bg-gray-900 text-gray-50 hover:bg-gray-900/90 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  size="icon"
                  variant="ghost"
                >
                  <ShoppingCartIcon className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
    );
    }
    export default BestsellerCard;
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
        )
      }