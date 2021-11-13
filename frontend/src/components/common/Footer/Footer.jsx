import React from "react";
import styles from "@footer/Footer.module.css";
import { Layout } from "antd";
const { Footer } = Layout;

function FixedFooter() {
  return (
    <div>
      <Footer style={{ textAlign: "center", backgroundColor: "#E2E9F0" }}>
        ©2021 Created by NEXT LEVEL
      </Footer>
    </div>
  );
}

export default FixedFooter;
