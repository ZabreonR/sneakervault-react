import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Market from "./pages/Market";
import Product from "./pages/Product";
import Timeline from "./pages/Timeline";
import Blog from "./pages/Blog";
import AboutContact from "./pages/AboutContact";
import AddSneaker from "./pages/AddSneaker";  
import "./styles/globals.css";

export default function App() {
  return (
    <Router>
      {/* Uses NavBar globally */}
      <NavBar />

      <main className="page container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/market" element={<Market />} />
          <Route path="/product" element={<Product />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about-contact" element={<AboutContact />} />
          <Route path="/add-sneaker" element={<AddSneaker />} /> {}
        </Routes>
      </main>

      <footer className="site-footer">
        <div className="footer-inner container">
          <div>© 2025 SneakerVault</div>
        </div>
      </footer>
    </Router>
  );
}