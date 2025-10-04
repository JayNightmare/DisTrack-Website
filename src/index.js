import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import SupportPin from "./components/SupportPin";
import Particles from "./components/particles";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Router>
            <Particles
                className="absolute inset-0 -z-10 animate-fade-in"
                quantity={200}
            />
            <SupportPin />
            <App />
        </Router>
    </React.StrictMode>
);
