import React from "react";
import styles from "./Loader.module.scss";

export default function Loader() {
  return (
    <div className={styles.centered}>
      <div className={styles.loader}></div>;
    </div>
  );
}
