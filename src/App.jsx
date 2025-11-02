
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
import UserNewArrival from './Pages/User/UserNewArrival.jsx';

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
            <Route path="/userNewArrival" element={<UserNewArrival />} />

        </Routes>
    </>

  )
}

export default App
