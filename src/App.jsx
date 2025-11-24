
import './App.css'
import { Routes, Route } from 'react-router-dom'
import  Home from './Pages/User/Home.jsx'
import UserDetails from "./Pages/Admin/UserDetails.jsx";
import  UserProfile from  "./Pages/User/UserProfile.jsx"
import  AdminPage from "./Pages/Admin/AdminPage.jsx"
import NewArrival from "./Pages/User/NewArrival.jsx";
import OfficeWear from "./Pages/User/OfficeWear.jsx";
import Denims from "./Pages/User/Denims.jsx";
import Frocks from "./Pages/User/Frocks.jsx";
import TopWear from "./Pages/User/TopWear.jsx";
import AddClothForm from "./Pages/Admin/AddClothForm.jsx";
import DisplayCloth from "./Pages/Admin/DisplayCloth.jsx";
import UpdateCloth from "./Pages/Admin/UpdateCloth.jsx";
import HiddenNewArrival from "./Pages/Admin/HiddenNewArrival";
import NewArrivalAdmin from "./Pages/Admin/NewArrival.jsx";
import AdminCarousel from './Pages/Admin/AdminCarousel.jsx';
import AddSlideModal from './Pages/Admin/AddSlideModal.jsx';
import EditSlideModal from './Pages/Admin/EditSlideModal.jsx';
import HomeCarousel from './Components/Home/HomeCarousel.jsx';
import LoginModal from './Components/Auth/LoginModal.jsx';
import AdminOfferSection from './Pages/Admin/AdminOfferSection.jsx';
import ProductDetails from './Components/Common/ProductDetails.jsx';
import CartPage from './Pages/User/CartPage.jsx';
function App() {

  return (
    <>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/userdetails" element={<UserDetails/>}/>
            <Route path="/userProfile" element={<UserProfile/>}/>
            <Route path="/adminPage" element={<AdminPage/>}/>
            <Route path="/newArrival" element={<NewArrival/>}/>
            <Route path="/officeWear" element={<OfficeWear/>}/>
            <Route path="/denim" element={<Denims/>}/>
            <Route path="/frock" element={<Frocks/>}/>
            <Route path="/topWear" element={<TopWear/>}/>
            <Route path="/addCloth" element={<AddClothForm/>}/>
            <Route path="/displayCloth" element={<DisplayCloth/>}/>
            <Route path="/updateCloth/:id" element={<UpdateCloth />} />
            <Route path="/hidden-items" element={<HiddenNewArrival />} />
            <Route path="/newArrivalAdmin" element={<NewArrivalAdmin />} />
            <Route path="/adminCarousel" element={<AdminCarousel />} />
            <Route path="/addSlideModal" element={<AddSlideModal />} />
            <Route path="/editSlideModal/:id" element={<EditSlideModal />} />
            <Route path="/homeCarousel" element={<HomeCarousel />} />
            <Route path='/login' element={<LoginModal/>}/>
            <Route path='/adminOfferSection'element={<AdminOfferSection/>}/>
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
        </Routes>
    </>

  )
}

export default App
