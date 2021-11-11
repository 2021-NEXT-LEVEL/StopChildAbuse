import React, { useState, useEffect } from "react";
import styles from "@result/ResultPage.module.css";
import TitleBar from "@titlebar/TitleBar";
import Paper from "@mui/material/Paper";
import { Input, Row, Col, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

function ResultPage() {
  return (
    <div className={styles.container}>
      <Paper className={styles.paper} elevation={0}>
        <TitleBar title_name="Request" />
        <div className={styles.inner}>
          <div className={styles.description}>
            반출 요청 및 처리 된 영상을 확인한 뒤 다운로드가 가능합니다.
          </div>
          <div className={styles.outer_box}>
            요청 날짜 <span style={{ paddingLeft: "80px" }} />
            2021.10.11 <div />
            어린이집 이름 <span style={{ paddingLeft: "54px" }} />A <div />
            선택된 날짜 <span style={{ paddingLeft: "67px" }} />
            2021.10.02
            <div /> 아동 이름 <span style={{ paddingLeft: "80px" }} />
            OOO <div />
            사유
            <span style={{ paddingLeft: "115px" }} />
            자녀 등에서 멍 자국이 2번 발견됐습니다. 확인 부탁드립니다.
          </div>
          <div className={styles.outer_box}>
            아동 복호화 키 <span style={{ paddingLeft: "120px" }} />
            <font>KANC8261S</font> <div />
            <font style={{ color: "red", fontSize: "0.9em" }}>
              (주의: 타인에게 노출되지 않도록 주의하시기 바랍니다.)
            </font>
          </div>
          <Row gutter={[16, 16]}>
            <Col span={14}>
              <div className={styles.video}></div>
            </Col>
            <Col span={10}>
              <div className={styles.keyInput}>
                <b>복호화 키 입력</b>
                <div>
                  <Input style={{ width: "80%" }} />
                </div>
              </div>
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                size="large"
                className={styles.downloadButton}
              >
                Download
              </Button>
            </Col>
          </Row>
        </div>
      </Paper>
    </div>
  );
}

export default ResultPage;
