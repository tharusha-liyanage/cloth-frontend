// src/Pages/Admin/AdminPage.jsx
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Header&Footer/Navbar.jsx";

const AdminPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleUserDetails = () => {
        navigate("/userdetails"); //
    };

    const handleAddCloth = () => {
        navigate("/addCloth"); //
    };

    const handleDisplayCloth = () => {
        navigate("/displayCloth"); //
    };

    const handleHiddenItems = () => {
        navigate("/hidden-items"); //
    };

    const handleNewArrival = () => {
        navigate("/newArrivalAdmin"); //
    };

    return (
        <div>
            <Navbar/>
        <div className="min-h-screen bg-[#EAF4F6] flex flex-col items-center pt-28 px-6">
            {/* Welcome Section */}
            <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-3xl text-center">
                <h1 className="text-3xl font-bold text-[#023545] mb-2">
                    Hello {user?.username || "Admin"} 👋
                </h1>
                <p className="text-gray-700 text-lg">
                    Welcome to <span className="font-semibold">Mahinda Trade Center</span> Admin Interface.
                </p>
            </div>

            {/* Quick Access Section */}
            <div className="mt-10 bg-white shadow-md rounded-2xl p-8 w-full max-w-3xl">
                <h2 className="text-2xl font-semibold text-[#023545] mb-6 text-center">
                    Quick Access to Tasks
                </h2>

                <div className="flex flex-wrap justify-center gap-6">
                    {/* User Details Button */}
                    <button
                        onClick={handleUserDetails}
                        className="bg-[#023545] text-white px-6 py-3 rounded-2xl hover:bg-[#03506f] transition font-medium shadow-md"
                    >
                        Manage Users
                    </button>

                    {/* Add more buttons later if needed */}
                    <button
                        onClick={handleAddCloth}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-2xl hover:bg-indigo-700 transition font-medium shadow-md"
                    >
                        Add New Cloth
                    </button>

                    <button
                        onClick={handleDisplayCloth}
                        className="bg-green-600 text-white px-6 py-3 rounded-2xl hover:bg-green-700 transition font-medium shadow-md"
                    >
                        Inventory
                    </button>

                    <button
                        onClick={handleHiddenItems}
                        className="bg-red-600 text-white px-6 py-3 rounded-2xl hover:bg-red-700 transition font-medium shadow-md"
                    >
                        Manage Hidden Items
                    </button>

                    <button
                        onClick={handleNewArrival}
                        className="bg-pink-600 text-white px-6 py-3 rounded-2xl hover:bg-pink-700 transition font-medium shadow-md"
                    >
                        Handle New Arrival
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default AdminPage;

