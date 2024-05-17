import Navbar from "../components/Navbar"
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
            
            <Navbar
                links={[
                { href: "/", name: "Home" },
                { href: "#donate", name: "Donate Now" },
                { href: "#past", name: "Past Campaigns" },
                { href: "#volunteer", name: "Volunteer" },
                { href: "#start", name: "Start a fundraiser" },
                {button: true, path: "/login", btn_name: "Login"},
                {button: true, path: "/register", btn_name: "Register"}
                ]} 
            />
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
document.body.removeAttribute("class")
export default Landing