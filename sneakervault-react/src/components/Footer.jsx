import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.siteFooter}>
      <div className={`${styles.footerInner} container`}>
        <div>
          © {new Date().getFullYear()} SneakerVault |{" "}
          <a href="/about-contact" className={styles.contactLink}>
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}