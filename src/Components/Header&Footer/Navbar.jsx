import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    Menu,
    X,
    UserRound,
} from "lucide-react";

import LoginModal from "../Auth/LoginModal";
import SignupModal from "../Auth/SignupModal";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "New Arrival", path: "/newArrival"   },
        { name: "Office Wear", path: "/officeWear" },
        { name: "Denims", path: "/denim" },
        { name: "Frocks", path: "/frock" },
        { name: "Top Wear", path: "/topWear" },

    ];

    // 🧩 Handle Logout
    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            logout();
            setIsOpen(false);
            navigate("/");
        }
    };

    // 🧩 Handle clicking username → redirect by role
    const handleProfileClick = () => {
        if (!user) return;
        if (user.role === "ADMIN") {
            navigate("/adminPage");
        } else {
            navigate("/userProfile");
        }
        setIsOpen(false);
    };

    return (
        <>
            {/* Navbar */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-[#EAF4F6] shadow-md">
                <div className="max-w-7xl mx-auto  py-3 flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold text-[#023545] tracking-wide">
                        Mahinda Trade Center
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`flex items-center gap-1 font-medium text-[#023545] hover:text-indigo-600 transition ${
                                        isActive ? "text-indigo-600" : ""
                                    }`}
                                >
                                    {link.icon}
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Auth / User Section */}
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <>
                                <button
                                    onClick={handleProfileClick}
                                    className="flex items-center gap-2 text-[#023545] font-medium hover:text-indigo-600 transition"
                                >
                                    <UserRound size={18} />
                                    {user.username}
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="bg-[#023545] text-white px-4 py-2 rounded-2xl hover:opacity-90 transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => setShowLogin(true)}
                                    className="flex items-center gap-2 bg-[#023545] text-white px-5 py-2.5 rounded-2xl hover:opacity-90 transition shadow-md"
                                >
                                    <UserRound size={18} />
                                    Login
                                </button>
                                <button
                                    onClick={() => setShowSignup(true)}
                                    className="bg-white text-[#023545] px-4 py-2 rounded-2xl border border-[#023545] hover:bg-[#023545] hover:text-white transition"
                                >
                                    Sign Up
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-[#023545] p-2 rounded-md hover:bg-white/40 transition"
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden bg-[#EAF4F6] px-6 pb-4 shadow-lg">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className="block py-2 text-[#023545] font-medium hover:text-indigo-600"
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div className="mt-3 border-t pt-3">
                            {user ? (
                                <>
                                    <button
                                        onClick={handleProfileClick}
                                        className="block text-[#023545] mb-2 font-medium"
                                    >
                                        <UserRound className="inline-block mr-2" size={18} />
                                        {user.username}
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full bg-[#023545] text-white px-4 py-2 rounded-2xl hover:opacity-90 transition"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => {
                                            setIsOpen(false);
                                            setShowLogin(true);
                                        }}
                                        className="w-full bg-[#023545] text-white px-4 py-2 rounded-2xl hover:opacity-90 transition mb-2"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsOpen(false);
                                            setShowSignup(true);
                                        }}
                                        className="w-full bg-white text-[#023545] border border-[#023545] px-4 py-2 rounded-2xl hover:bg-[#023545] hover:text-white transition"
                                    >
                                        Sign Up
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* Modals */}
            <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
            <SignupModal isOpen={showSignup} onClose={() => setShowSignup(false)} />
        </>
    );
};

export default Navbar;
