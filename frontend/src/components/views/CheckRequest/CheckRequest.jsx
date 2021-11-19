import React, { useState, useEffect } from "react";
import Axios from "@api/index";
import styles from "@checkRequest/CheckRequest.module.css";
import TitleBar from "@titlebar/TitleBar";
import Paper from "@mui/material/Paper";
import { Form, Row, Col, Radio, Button, Result, Progress } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

function ResultPage() {
  const [disabled, setDisabled] = useState(true);
  const [checkValue, setCheckValue] = useState(2);

  const toggleDisabled = () => {
    setDisabled(!disabled);
  };

  const onChange = (e) => {
    setCheckValue(e.target.value);
  };

  const handleSubmit = (values) => {
    console.log(checkValue); // 적절성 체크 (1 or 2)
  };

  return (
    <div className={styles.container}>
      <Paper className={styles.paper} elevation={0}>
        <TitleBar title_name="Check Request" />
        <div className={styles.inner}>
          <div className={styles.description}>
            학부모의 반출 요청을 확인하고, 적절한 사유가 작성된 요청에 대한 영상
            암호화 처리를 진행합니다.
          </div>
          <div className={styles.outer_box}>
            요청 학부모 <span style={{ paddingLeft: "67px" }} />
            2021.10.11 <div />
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
            <Radio.Group onChange={onChange} value={checkValue}>
              <Radio value={1} defaultChecked={false} disabled={disabled}>
                yes
              </Radio>
              <Radio value={2} defaultChecked disabled={disabled}>
                no
              </Radio>
            </Radio.Group>
            <br />
            <Button
              type="primary"
              onClick={toggleDisabled}
              style={{ marginTop: 16 }}
            >
              적절성 유무 판단
            </Button>
          </div>
          <Row gutter={[16, 16]}>
            <Col span={14}>
              <div className={styles.video}></div>
            </Col>
            <Col span={10} className={styles.col_right}>
              {/* <Progress
                type="circle"
                percent={100}
                format={() => "Done"}
                className={styles.progress}
              />
              <div style={{ paddingTop: "20px" }}>
                <b>암호화가 성공적으로 완료됐습니다.</b>
              </div> */}
            </Col>
          </Row>
          <Button
            type="primary"
            size="large"
            className={styles.submitBtn}
            onClick={handleSubmit}
          >
            제출
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default ResultPage;
