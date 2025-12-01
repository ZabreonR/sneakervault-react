import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <>
      {/* Navbar added globally */}

      <main className={`container ${styles.page}`}>
        <section className={`${styles.panel} reveal`}>
          {/* Image Gallery */}
          <div className={styles.gallery}>
            <div className={styles.mainImage}>
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format&fit=crop"
                alt="Crimson Velocity Sneaker"
              />
            </div>
            <div className={styles.thumbGrid}>
              <div className={styles.thumb}>
                <img
                  src="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800&auto=format&fit=crop"
                  alt="White sneaker alt view"
                />
              </div>
              <div className={styles.thumb}>
                <img
                  src="https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?q=80&w=800&auto=format&fit=crop"
                  alt="Bone color alt view"
                />
              </div>
              <div className={styles.thumb}>
                <img
                  src="https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=800&auto=format&fit=crop"
                  alt="Blue sneaker alt view"
                />
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className={styles.details}>
            <h1>Crimson Velocity</h1>
            <p className={styles.meta}>
              Brand: SV Studio • SKU: SV-CV01 • Condition: New
            </p>
            <h2>$199</h2>
            <p className={styles.desc}>
              Lightweight knit upper with responsive foam midsole. Daily driver built for
              comfort and style.
            </p>

            <div className={styles.actions}>
              <a className={styles.btn} href="#">Buy Now</a>
              <a className={`${styles.btn} ${styles.alt}`} href="#">Propose Trade</a>
              <a className={`${styles.btn} ${styles.alt}`} href="#">Add to Wishlist</a>
            </div>

            <section className={styles.detailList}>
              <h3>Details</h3>
              <ul>
                <li>Release year: 2025</li>
                <li>Materials: Knit upper, rubber outsole</li>
                <li>Included: Extra laces, dust bag</li>
              </ul>
            </section>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}