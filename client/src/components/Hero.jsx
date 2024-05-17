import HeroImg from '../assets/hero_img.png';
const Hero = () => {
  return (
    <section className="relative w-full h-[80vh] py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid items-center justify-center gap-8 lg:grid-cols-2">
          <div className="space-y-4 text-center z-10">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
              Made with ♥️ by Local Artisans
            </h1>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
              Discover unique, handcrafted products made by local artisans in
              your community.
            </p>
            <a
              className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              href="#"
            >
              View products
            </a>
          </div>
        </div>
      </div>
      <img
        className="absolute inset-0 z-0 h-full w-full object-cover"
        src={HeroImg}
      />
    </section>
  )
  }
export default Hero;