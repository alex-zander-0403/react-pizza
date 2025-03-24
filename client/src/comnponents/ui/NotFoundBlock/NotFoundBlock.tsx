import React, { JSX } from "react";
import styles from "./NotFoundBlock.module.scss";

export default function NotFoundBlock(): JSX.Element {
  return (
    <>
      <div className={styles.root}>
        <span>🙈</span>
        <h1>Ничего не найдено :(</h1>
        <p className={styles.description}>
          К сожалению данная страница отсутствует или в данный момент недоступна
        </p>
      </div>
    </>
  );
}
