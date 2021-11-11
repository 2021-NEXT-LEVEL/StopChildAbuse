import React from "react";
import styles from "@documents/Documents.module.css";
import TitleBar from "@titlebar/TitleBar";
import Paper from "@mui/material/Paper";
import { Input, Row, Col, Button } from "antd";

function Documents() {
  return (
    <div className={styles.container}>
      <Paper className={styles.paper} elevation={0}>
        <TitleBar title_name="Documents" />
        <div className={styles.inner}>
          <div className={styles.description}>
            해당 서비스의 이용방법을 안내합니다.
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default Documents;
