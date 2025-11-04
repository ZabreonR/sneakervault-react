import React, { useState } from "react";
import styles from "../styles/Navbar.module.css";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        SNEAKER<span>VAULT</span>
      </div>

      {/* Hamburger Icon */}
      <button className={styles.menuButton} onClick={toggleMenu}>
        ☰
      </button>

      {/* Menu Links */}
      <ul
        className={`${styles.navLinks} ${menuOpen ? styles.showMenu : ""}`}
        onClick={() => setMenuOpen(false)}
      >
        <li>
          <a href="/sneakervault-react/">Home</a>
        </li>
        <li>
          <a href="/sneakervault-react/market">Market</a>
        </li>
        <li>
          <a href="/sneakervault-react/timeline">Timeline</a>
        </li>
        <li>
          <a href="/sneakervault-react/blog">Blog</a>
        </li>
        <li>
          <a href="/sneakervault-react/about-contact">About & Contact</a>
        </li>
      </ul>
    </nav>
  );
}