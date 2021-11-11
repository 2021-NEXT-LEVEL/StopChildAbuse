import React from "react";
import styles from "@titlebar/TitleBar.module.css";

function TitleBar({ title_name }) {
  return (
    <div className={styles.titlebar}>
      <img className={styles.icon} src="/assets/Icons/request.png" />
      <span className={styles.title}>{title_name}</span>
    </div>
  );
}

export default TitleBar;
