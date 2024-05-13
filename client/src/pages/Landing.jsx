import NavbarLand from "../components/NavbarLand"
import Hero from "../components/Hero"
import Categories from "../components/Categories"
import Bestseller from "../components/Bestseller"
import FeaturedArtisan from "../components/FeaturedArtisan"
import Socials from "../components/Socials"
import Testimonial from "../components/Testimonial"
import Footer from "../components/Footer"
const Landing = () => {
    return(
        <div>
            
            <NavbarLand />
            <Hero />
            <Categories />
            <Bestseller />
            <FeaturedArtisan />
            <Socials/>
            <Testimonial />
            <Footer />
        </div>
        
    )
}
export default Landing