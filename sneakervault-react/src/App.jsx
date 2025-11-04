import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Market from "./pages/Market";
import Product from "./pages/Product";
import Timeline from "./pages/Timeline";
import Blog from "./pages/Blog";
import AboutContact from "./pages/AboutContact";
import "./styles/globals.css";

export default function App() {
  return (
    <Router basename="/sneakervault-react">
      <header className="site-header">
        <div className="header-inner container">
          <Link className="logo" to="/">SNEAKERVAULT</Link>
          <nav className="main-nav">
            <Link to="/">Home</Link>
            <Link to="/market">Market</Link>
            <Link to="/timeline">Timeline</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/about-contact">About & Contact</Link>
          </nav>
        </div>
      </header>

      <main className="page container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/market" element={<Market />} />
          <Route path="/product" element={<Product />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about-contact" element={<AboutContact />} />
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