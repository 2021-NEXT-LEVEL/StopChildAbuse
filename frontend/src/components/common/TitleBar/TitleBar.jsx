import React from "react";
import styles from "@titlebar/TitleBar.module.css";

function TitleBar({ title_name }) {
  const renderSwitch = (param) => {
    switch (param) {
      case "웹사이트 소개":
        return (
          <img className={styles.icon} src="/assets/Icons/documents.png" />
        );
      case "요청하기":
        return <img className={styles.icon} src="/assets/Icons/request.png" />;
      case "요청 결과":
        return <img className={styles.icon} src="/assets/Icons/result.png" />;
      case "전체 요청":
        return (
          <img className={styles.icon} src="/assets/Icons/check_request.png" />
        );
      case "회원 정보":
        return <img className={styles.icon} src="/assets/Icons/group.png" />;
      case "요청 확인":
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
