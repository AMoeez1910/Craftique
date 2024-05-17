const ProductCard = () => {
    return (
        <div className="relative group">
                            <a className="absolute inset-0 z-10" href="#">
                                <span className="sr-only">View</span>
                            </a>
                            <img
                                alt="Product Image"
                                className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
                                height={300}
                                src="https://placehold.co/600x400"
                                width={300}
                            />
                            <div className="flex-1 py-4">
                                <h3 className="font-semibold tracking-tight">Ergonomic Office Chair</h3>
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="flex items-center gap-0.5">
                                        <StarIcon className="w-4 h-4 fill-primary" />
                                        <StarIcon className="w-4 h-4 fill-primary" />
                                        <StarIcon className="w-4 h-4 fill-primary" />
                                        <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
                                        <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
                                    </div>
                                    <span className="text-gray-500 dark:text-gray-400">(72)</span>
                                </div>
                                <h4 className="font-semibold text-lg">$179.99</h4>
                            </div>
                        </div>
    );
    }   
export default ProductCard;
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