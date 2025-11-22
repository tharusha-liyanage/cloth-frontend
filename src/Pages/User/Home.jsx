import Navbar from "../../Components/Header&Footer/Navbar.jsx";
import Collection from "../../Components/Home/Collection.jsx";
import HeroDetails from "../../Components/Home/HeroDetails.jsx";
import HomeCarousel from "../../Components/Home/HomeCarousel.jsx";
import NewArrivalCarousel from "../../Components/Home/NewArrivalCarousel.jsx";
import OfferBanner from "./OfferBanner.jsx";
function Home() {
    return (
        <>
            <Navbar/>
            <HomeCarousel/>
            <HeroDetails/>
            <NewArrivalCarousel/>
            <Collection/>
            <OfferBanner/>
        </>
    )
};
export default Home;
