import React from "react";
import styles from "@titlebar/TitleBar.module.css";

function TitleBar({ title_name }) {
  const renderSwitch = (param) => {
    switch (param) {
      case "Documents":
        return (
          <img className={styles.icon} src="/assets/Icons/documents.png" />
        );
      case "Request":
        return <img className={styles.icon} src="/assets/Icons/request.png" />;
      case "Result":
        return <img className={styles.icon} src="/assets/Icons/result.png" />;
      case "Check Request":
        return (
          <img className={styles.icon} src="/assets/Icons/check_request.png" />
        );
      case "Check Result":
        return (
          <img className={styles.icon} src="/assets/Icons/check_result.png" />
        );
    }
  };

  return (
    <div className={styles.titlebar}>
      {renderSwitch(title_name)}
      <span className={styles.title}>{title_name}</span>
    </div>
  );
}

export default TitleBar;
