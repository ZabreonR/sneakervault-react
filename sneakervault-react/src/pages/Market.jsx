import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import styles from "../styles/Market.module.css";

export default function Market() {
  const [sneakers, setSneakers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load sneakers.json from the public/data folder
    fetch(process.env.PUBLIC_URL + "/data/sneakers.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load sneaker data");
        }
        return res.json();
      })
      .then((data) => {
        setSneakers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading sneaker data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/*  Navbar added globally */}
      <NavBar />

      <main className={styles.page}>
        {/* Featured Section */}
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h1>Featured Drop</h1>
            <p>
              Curated picks, verified sellers, and fair prices. Build your rotation with
              confidence.
            </p>
            <div className={styles.heroBtns}>
              <a href="#" className={styles.primaryBtn}>Shop Market</a>
              <a href="#" className={styles.secondaryBtn}>Sell</a>
              <a href="#" className={styles.secondaryBtn}>Trade</a>
            </div>
          </div>

          <div className={styles.heroImg}>
            <img
              src={process.env.PUBLIC_URL + "images/jordan4cem.png"}
              alt="Featured Sneaker"
            />
          </div>
        </section>

        {/* Filters */}
        <section className={styles.filters}>
          <div className={styles.filterGroup}>
            <select><option>All brands</option></select>
            <select><option>All sizes</option></select>
            <select><option>Any condition</option></select>
          </div>
          <div className={styles.sortGroup}>
            <label htmlFor="sort">Sort:</label>
            <select id="sort">
              <option>Newest</option>
            </select>
          </div>
        </section>

        {/* Product Grid */}
        {loading ? (
          <p className={styles.loading}>Loading sneakers...</p>
        ) : (
          <section className={styles.grid}>
            {sneakers.map((shoe) => {
              const img = process.env.PUBLIC_URL + "/" + shoe.img_name;
              return (
                <article key={shoe._id} className={styles.card}>
                  <div className={styles.thumb}>
                    <img src={img} alt={shoe.name} />
                  </div>
                  <div className={styles.cardBody}>
                    <h3>{shoe.name}</h3>
                    <p className={styles.condition}>{shoe.condition}</p>
                    <p className={styles.price}>${shoe.price}</p>
                  </div>
                </article>
              );
            })}
          </section>
        )}

        <footer className={styles.footer}>© 2025 SneakerVault</footer>
      </main>
    </>
  );
}