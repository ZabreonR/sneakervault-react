import React from "react";
import styles from "./Card.module.css";

export default function Card({ image, title, meta, children }) {
  return (
    <article className={styles.card}>
      {image && (
        <div className={styles.thumb}>
          <img src={image} alt={title || "SneakerVault item"} />
        </div>
      )}
      <div className={styles.body}>
        {title && <h3 className={styles.title}>{title}</h3>}
        {meta && <p className={styles.meta}>{meta}</p>}
        {children && <div className={styles.content}>{children}</div>}
      </div>
    </article>
  );
}