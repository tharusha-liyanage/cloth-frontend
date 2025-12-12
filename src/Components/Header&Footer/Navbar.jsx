import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, UserRound } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { ShoppingCart } from "lucide-react"; 
import CartSidebar from "../Cart/CartSidebar.jsx";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "New Arrival", path: "/newArrival" },
    { name: "Office Wear", path: "/officeWear" },
    { name: "Denims", path: "/denim" },
    { name: "Frocks", path: "/frock" },
    { name: "Top Wear", path: "/topWear" },
  ];

  // 🧩 Handle Logout
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      setIsOpen(false);
      navigate("/");
    }
  };

  // 🧩 Handle clicking username → redirect by role
  const handleProfileClick = () => {
    if (!user) return;
    navigate(user.role === "ADMIN" ? "/adminPage" : "/userProfile");
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#f6f2eaff] shadow-md">
      <div className="max-w-7xl mx-auto py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-[#604a03ff] tracking-wide">
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
                className={`flex items-center gap-1 font-medium text-[#604a03ff] hover:text-indigo-600 transition ${
                  isActive ? "text-[#af8314ff]" : ""
                }`}
              >
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
                className="flex items-center gap-2 text-[#604a03ff] font-medium hover:text-indigo-600 transition"
              >
                <UserRound size={18} />
                {user.username}
              </button>
              <button
  onClick={() => setCartOpen(true)}
  className="relative bg-white border px-3 py-2 rounded-md hover:bg-gray-50"
>
  <ShoppingCart size={18} />
  <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 grid place-items-center">
    {itemCount}
  </span>
</button>

<CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} onViewCart={() => { setCartOpen(false); navigate("/cart"); }} />
              <button
                onClick={handleLogout}
                className="bg-[#604a03ff] text-white px-4 py-2 rounded-2xl hover:opacity-90 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 bg-[#604a03ff] text-white px-5 py-2.5 rounded-2xl hover:opacity-90 transition shadow-md"
              >
                <UserRound size={18} />
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="bg-white text-[#604a03ff] px-4 py-2 rounded-2xl border border-[#023545] hover:bg-[#604a03ff] hover:text-white transition"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#604a03ff] p-2 rounded-md hover:bg-white/40 transition"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#f6f2eaff] px-6 pb-4 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block py-2 text-[#604a03ff] font-medium hover:text-[#af8314ff] transition"
            >
              {link.name}
            </Link>
          ))}

          <div className="mt-3 border-t pt-3">
            {user ? (
              <>
                <button
                  onClick={handleProfileClick}
                  className="block text-[#604a03ff] mb-2 font-medium"
                >
                  <UserRound className="inline-block mr-2" size={18} />
                  {user.username}
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full bg-gradient-to-r from-[#604a03ff] to-[#af8314ff] text-white px-4 py-2 rounded-2xl hover:opacity-90 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/login");
                  }}
                  className="w-full bg-gradient-to-r from-[#604a03ff] to-[#af8314ff] text-white px-4 py-2 rounded-2xl hover:opacity-90 transition mb-2"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/signup");
                  }}
                  className="w-full bg-white text-[#604a03ff] border border-[#604a03ff] px-4 py-2 rounded-2xl hover:bg-[#604a03ff] hover:text-white transition"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
