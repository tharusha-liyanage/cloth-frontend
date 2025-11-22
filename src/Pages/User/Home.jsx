import Navbar from "../../Components/Header&Footer/Navbar.jsx";
import HeroDetails from "../../Components/Home/HeroDetails.jsx";
import HomeCarousel from "../../Components/Home/HomeCarousel.jsx";
import NewArrivalCarousel from "../../Components/Home/NewArrivalCarousel.jsx";
function Home() {
    return (
        <>
            <Navbar/>
            <HomeCarousel/>
            <HeroDetails/>
            <NewArrivalCarousel/>
        </>
    )
};
export default Home;
