import React from "react";
import styles from "./Grid.module.css";

export default function Grid({ children, columns }) {
  const gridStyle = {
    gridTemplateColumns: columns
      ? `repeat(${columns}, 1fr)`
      : "repeat(auto-fill, minmax(260px, 1fr))",
  };

  return (
    <div className={styles.grid} style={gridStyle}>
      {children}
    </div>
  );
}
