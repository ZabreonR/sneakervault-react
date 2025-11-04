import React from "react";
import styles from "./Section.module.css";

export default function Section({ title, subtitle, children }) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          {title && <h2 className={styles.title}>{title}</h2>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </section>
  );
}