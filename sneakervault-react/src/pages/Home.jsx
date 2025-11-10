import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar"; 
import styles from "../styles/Home.module.css";

export default function Home() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Navbar added globally */}
      <NavBar />

      <main className={styles.home}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.textContent}>
            <h1>
              Welcome to <span>SneakerVault</span>
            </h1>
            <p>
              Where passion meets collection. Shop, sell, and track iconic sneaker drops
              with confidence.
            </p>

            <div className={styles.buttons}>
              <Link to="/market" className={styles.primaryBtn}>
                ENTER MARKETPLACE
              </Link>
              <Link to="/about-contact" className={styles.secondaryBtn}>
                LEARN MORE
              </Link>
            </div>
          </div>

          <div className={styles.imageWrapper}>
            <img
              src={`${import.meta.env.BASE_URL}images/jordan1red.png`}
              alt="Jordan 4 Cement sneaker"
              className={styles.heroImage}
            />
          </div>
        </section>

        {/* About SneakerVault */}
        <section className={styles.about}>
          <h2>What We Offer</h2>
          <p>
            SneakerVault is a student-built sneaker marketplace focused on real drops, real
            people, and real reviews. Discover a clean, responsive experience designed for
            sneaker lovers everywhere.
          </p>
        </section>

        {/* Scroll to Top Button */}
        {showScroll && (
          <button className={styles.scrollTopBtn} onClick={scrollToTop}>
            ↑
          </button>
        )}
      </main>
    </>
  );
}