import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "@userMain/UserMainPage.module.css";
import { Row, Col, Result, Button } from "antd";

function UserMainPage() {
  const history = useHistory();
  const movePage = (url) => {
    history.push(url);
  };
  return (
    <div className={styles.container}>
      <div className={styles.sitemap}>사이트 소개</div>
      <div className={styles.bottom_lbox}>
        <hr className={styles.hor_line} />
        <div>해당 서비스는 아동학대 방지를</div>
        <div>목적으로 자동 모자이크 처리된</div>
        <div> CCTV 영상을 학부모에게 제공합니다.</div>
      </div>
      <div className={styles.bottom_rbox}>
        <Row gutter={[16, 16]}>
          <Col
            className={styles.col}
            span={8}
            onClick={() => movePage("/user/documents")}
          >
            <div className={styles.inner_col}>
              <img
                className={styles.main_icon}
                src="/assets/Icons/documents.png"
              />
              <div className={styles.subtitle}>Documents</div>
              <div className={styles.description}>
                해당 서비스의 이용방법을 안내합니다.
              </div>
            </div>
          </Col>
          <Col
            className={styles.col}
            span={8}
            onClick={() => movePage("/user/request")}
          >
            <div className={styles.inner_col}>
              <img
                className={styles.main_icon}
                src="/assets/Icons/request.png"
              />
              <div className={styles.subtitle}>Request</div>
              <div className={styles.description}>
                <div>아동학대 의심 정황 발생 시,</div>
                <div>CCTV 영상 반출을 요청할 수 있습니다.</div>
              </div>
            </div>
          </Col>
          <Col
            className={styles.col}
            span={8}
            onClick={() => movePage("/user/result")}
          >
            <div className={styles.inner_col}>
              <img
                className={styles.main_icon}
                src="/assets/Icons/result.png"
              />
              <div className={styles.subtitle}>Result</div>
              <div className={styles.description}>
                <div>반출 요청 및 처리 된 영상을</div>
                <div>확인한 뒤 다운로드가 가능합니다.</div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default UserMainPage;
