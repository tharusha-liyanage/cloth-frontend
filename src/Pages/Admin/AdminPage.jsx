// src/Pages/Admin/AdminPage.jsx
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Header&Footer/Navbar.jsx";

const ActionCard = ({ title, subtitle, onClick, iconBg = "bg-[#f6f2ea]", icon }) => (
    <div
        onClick={onClick}
        className="cursor-pointer bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-200"
    >
        <div className="flex items-start gap-4">
            <div className={`w-12 h-12 flex items-center justify-center rounded-lg ${iconBg}`}>
                {icon}
            </div>

            <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#604a03ff]">{title}</h3>
                <p className="text-sm text-gray-500">{subtitle}</p>
            </div>
        </div>

        <div className="mt-4">
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                }}
                className="inline-block bg-[#604a03ff] text-white px-4 py-2 rounded-full text-sm hover:opacity-95 transition"
            >
                Open
            </button>
        </div>
    </div>
);

const AdminPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleUserDetails = () => navigate("/userdetails");
    const handleAddCloth = () => navigate("/addCloth");
    const handleDisplayCloth = () => navigate("/displayCloth");
    const handleHiddenItems = () => navigate("/hidden-items");
    const handleNewArrival = () => navigate("/newArrivalAdmin");
    const handleCarousel = () => navigate("/adminCarousel");
    const handleOfferSection = () => navigate("/adminOfferSection");
    const handleOrderDetails = () => navigate("/orderDetails");

    return (
        <div>
            <Navbar />

            <div className="min-h-screen bg-[#f6f2eaff] flex flex-col items-center pt-28 px-6 pb-12">
                <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-5xl text-center">
                    <h1 className="text-3xl font-bold text-[#604a03ff] mb-2">
                        Hello {user?.username || "Admin"} 👋
                    </h1>
                    <p className="text-gray-700 text-lg">
                        Welcome to <span className="font-semibold">Mahinda Trade Center</span> Admin Interface.
                    </p>
                </div>

                <div className="mt-10 w-full max-w-5xl">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-semibold text-[#604a03ff]">Quick Access to Tasks</h2>
                        <p className="text-sm text-gray-500">Tap a card or press Open to navigate</p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                        <ActionCard
                            title="Manage Users"
                            subtitle="View and manage registered users"
                            onClick={handleUserDetails}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#023545]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9 9 0 1118.88 6.196 9 9 0 015.12 17.804z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>}
                        />

                        <ActionCard
                            title="Add New Cloth"
                            subtitle="Create new inventory items"
                            onClick={handleAddCloth}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#023545]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>}
                        />

                        <ActionCard
                            title="Inventory"
                            subtitle="Display and edit inventory"
                            onClick={handleDisplayCloth}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#023545]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" /></svg>}
                        />

                        <ActionCard
                            title="Hidden Items"
                            subtitle="Manage items hidden from users"
                            onClick={handleHiddenItems}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#023545]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.97 0-9-4.03-9-9 0-1.05.17-2.066.49-3.02M6.1 6.1L17.9 17.9" /></svg>}
                        />

                        <ActionCard
                            title="New Arrivals"
                            subtitle="Manage new arrival collections"
                            onClick={handleNewArrival}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#023545]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" /></svg>}
                        />

                        <ActionCard
                            title="Carousel Slides"
                            subtitle="Manage homepage carousel slides"
                            onClick={handleCarousel}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#023545]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>}
                        />

                        <ActionCard
                            title="Offer Section"
                            subtitle="Add or edit promotional offers"
                            onClick={handleOfferSection}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#023545]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c1.657 0 3-1.567 3-3.5S13.657 1 12 1 9 2.567 9 4.5 10.343 8 12 8zM4 20a8 8 0 0116 0" /></svg>}
                        />

                        <ActionCard
                            title="Order Details"
                            subtitle="View and manage orders"
                            onClick={handleOrderDetails}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#023545]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18v4H3V3zm0 8h18v10H3V11z"/></svg>}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;

