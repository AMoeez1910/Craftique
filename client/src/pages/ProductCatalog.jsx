import { Checkbox } from "../components/ui/checkbox"
import { Label } from "../components/ui/label"
import { Button } from "../components/ui/button"
import { DropdownMenuTrigger, DropdownMenuRadioItem, DropdownMenuRadioGroup, DropdownMenuContent, DropdownMenu } from "../components/ui/dropdown-menu"
import NavbarLand from "../components/NavbarLand"
import ProductCard from "../components/ProductCard"
const ProductCatalog = () => {
    return (
        <>
        <NavbarLand />
        <div className="container mx-auto px-4 md:px-6 py-8">
            <div className="grid md:grid-cols-[280px_1fr] gap-8">
                <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6 top-4">
                    <h2 className="text-lg font-semibold mb-4">Filters</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-semibold mb-2">Category</h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Checkbox id="category-electronics" />
                                    <Label className="text-sm font-medium" htmlFor="category-electronics">
                                        Electronics
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="category-clothing" />
                                    <Label className="text-sm font-medium" htmlFor="category-clothing">
                                        Clothing
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="category-home" />
                                    <Label className="text-sm font-medium" htmlFor="category-home">
                                        Home & Kitchen
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="category-beauty" />
                                    <Label className="text-sm font-medium" htmlFor="category-beauty">
                                        Beauty & Personal Care
                                    </Label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold mb-2">Rating</h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Checkbox id="rating-4-up" />
                                    <Label className="text-sm font-medium" htmlFor="rating-4-up">
                                        4 stars & up
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="rating-3-up" />
                                    <Label className="text-sm font-medium" htmlFor="rating-3-up">
                                        3 stars & up
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="rating-2-up" />
                                    <Label className="text-sm font-medium" htmlFor="rating-2-up">
                                        2 stars & up
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="rating-1-up" />
                                    <Label className="text-sm font-medium" htmlFor="rating-1-up">
                                        1 star & up
                                    </Label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold mb-2">Price Range</h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Checkbox id="price-under-50" />
                                    <Label className="text-sm font-medium" htmlFor="price-under-50">
                                        Under $50
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="price-50-100" />
                                    <Label className="text-sm font-medium" htmlFor="price-50-100">
                                        $50 - $100
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="price-100-200" />
                                    <Label className="text-sm font-medium" htmlFor="price-100-200">
                                        $100 - $200
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="price-over-200" />
                                    <Label className="text-sm font-medium" htmlFor="price-over-200">
                                        Over $200
                                    </Label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <Checkbox id="free-delivery" />
                                <Label className="text-sm font-medium" htmlFor="free-delivery">
                                    Free Delivery
                                </Label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid gap-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                        <div className="grid gap-1">
                            <h1 className="text-2xl font-bold tracking-tight">Discover Our Latest Products</h1>
                            <p className="text-gray-500 dark:text-gray-400">
                                Browse through our curated selection of top-selling items.
                            </p>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="ml-auto shrink-0" variant="outline">
                                    <ArrowUpDownIcon className="w-4 h-4 mr-2" />
                                    Sort by
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[200px]">
                                <DropdownMenuRadioGroup value="top-sales">
                                    <DropdownMenuRadioItem value="top-sales">Top Sales</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="newest">Newest Arrival</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="price-high-low">Price: High to Low</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="price-low-high">Price: Low to High</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        
                        <ProductCard />
                    </div>
                </div>
            </div>
        </div>
</>
                        )
}
                        export default ProductCatalog

                        function ChevronDownIcon(props) {
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
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                        )
}


    
function ArrowUpDownIcon(props) {
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
        <path d="m21 16-4 4-4-4" />
        <path d="M17 20V4" />
        <path d="m3 8 4-4 4 4" />
        <path d="M7 4v16" />
      </svg>
    )
  }