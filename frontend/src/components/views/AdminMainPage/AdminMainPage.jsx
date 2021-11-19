import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "@adminMain/AdminMainPage.module.css";
import { Row, Col, Result, Button } from "antd";

function AdminMainPage() {
  const history = useHistory();
  const movePage = (url) => {
    history.push(url);
  };
  return (
    <div className={styles.container}>
      <div className={styles.sitemap}>사이트 소개</div>
      <div className={styles.bottom_lbox}>
        <hr className={styles.hor_line} />
        <div>관리자 계정에 오신 것을 환영합니다.</div>
      </div>
      <div className={styles.bottom_rbox}>
        <Row gutter={[16, 16]} className={styles.admin_rightside}>
          <Col
            className={styles.col}
            span={12}
            onClick={() => movePage("/master/checkRequest")}
          >
            <div className={styles.inner_col}>
              <img
                className={styles.main_icon}
                src="/assets/Icons/check_request.png"
              />
              <div className={styles.subtitle}>Check Request</div>
              <div className={styles.description}>
                <div>학부모의 반출 요청을 확인하고,</div>
                <div>적절한 사유가 작성된 요청에 대한</div>
                <div>영상 암호화 처리를 진행합니다.</div>
              </div>
            </div>
          </Col>
          <Col
            className={styles.col}
            span={12}
            onClick={() => movePage("/master/checkResult")}
          >
            <div className={styles.inner_col}>
              <img
                className={styles.main_icon}
                src="/assets/Icons/check_result.png"
              />
              <div className={styles.subtitle}>Check Result</div>
              <div className={styles.description}>
                암호화 된 영상 확인이 가능합니다.
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default AdminMainPage;
