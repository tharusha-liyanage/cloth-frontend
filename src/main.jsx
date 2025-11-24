import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../src/contexts/AuthContext.jsx";
import { CartProvider } from "../src/contexts/CartContext.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <CartProvider>
                     <App />
                </CartProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);

