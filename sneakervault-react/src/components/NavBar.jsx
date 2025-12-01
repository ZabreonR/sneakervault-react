import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "../styles/Navbar.module.css";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

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
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/market">Market</Link>
        </li>
        <li>
          <Link to="/timeline">Timeline</Link>
        </li>
        <li>
          <Link to="/blog">Blog</Link>
        </li>
        <li>
          <Link to="/about-contact">About & Contact</Link>
        </li>

        {/*Add Sneaker link */}
        <li>
          <Link to="/add-sneaker">Add Sneaker</Link>
        </li>
      </ul>
    </nav>
  );
}