// src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [loading, setLoading] = useState(false);

    // ✅ Attach token to axios automatically
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
    }, [token]);

    // ✅ Fetch current logged-in user (username + role)
    const getUser = async () => {
        if (!token) return;
        setLoading(true);
        try {
            const res = await axios.get(`${API_URL}/getUser`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // ✅ Expect backend response: { username: "admin", role: "ADMIN" }
            const data = res.data;

            if (data && data.username) {
                setUser(data);
                localStorage.setItem("user", JSON.stringify(data));
            } else {
                throw new Error("Invalid user data");
            }
        } catch (err) {
            console.error("Error fetching user:", err);
            setUser(null);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            setToken(null);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Register new user
    const register = async (username, password, email) => {
        try {
            const res = await axios.post(`${API_URL}/register`, {
                username,
                password,
                email,
            });
            alert("User registered successfully!");
            return res.data;
        } catch (err) {
            console.error("Registration failed:", err);
            alert("Registration failed. Try a different username.");
            throw err;
        }
    };

    // ✅ Login user and store token
    const login = async (username, password) => {
        try {
            const res = await axios.post(`${API_URL}/login`, { username, password });
            const receivedToken = res.data.token || res.data;

            if (receivedToken && receivedToken !== "login fail") {
                localStorage.setItem("token", receivedToken);
                setToken(receivedToken);
                await getUser(); // Load user info immediately
                return true;
            } else {
                alert("Invalid username or password!");
                return false;
            }
        } catch (err) {
            console.error("Login failed:", err);
            alert("Login failed. Please check your credentials.");
            return false;
        }
    };

    // ✅ Logout
    const logout = async () => {
        try {
            await axios.post(`${API_URL}/logout`);
        } catch (err) {
            console.warn("Logout endpoint error:", err);
        } finally {
            setUser(null);
            setToken(null);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }
    };

    // ✅ Refresh user (optional)
    const refreshUser = async () => {
        await getUser();
    };

    // ✅ Auto-load user if token exists
    useEffect(() => {
        if (token) getUser();
    }, [token]);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                register,
                logout,
                loading,
                getUser,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
