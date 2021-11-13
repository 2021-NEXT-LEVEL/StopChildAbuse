import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "@mainpage/MainPage.module.css";
import { Row, Col, Result, Button } from "antd";

function MainPage() {
  const [account, setAccount] = useState("user");
  const history = useHistory();
  const movePage = (url) => {
    history.push(url);
  };
  return (
    <div className={styles.container}>
      <div className={styles.sitemap}>사이트 소개</div>

      {account === "user" && (
        <>
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
                onClick={() => movePage("/documents")}
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
                onClick={() => movePage("/request")}
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
                onClick={() => movePage("/result")}
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
        </>
      )}
      {account === "admin" && (
        <>
          <div className={styles.bottom_lbox}>
            <hr className={styles.hor_line} />
            <div>관리자 계정에 오신 것을 환영합니다.</div>
          </div>
          <div className={styles.bottom_rbox}>
            <Row gutter={[16, 16]} className={styles.admin_rightside}>
              <Col
                className={styles.col}
                span={12}
                onClick={() => movePage("/checkRequest")}
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
                onClick={() => movePage("/checkResult")}
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
        </>
      )}
    </div>
  );
}

export default MainPage;
