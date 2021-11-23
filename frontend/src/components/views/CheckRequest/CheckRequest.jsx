import React, { useState, useEffect } from "react";
import Axios from "@api/index";
import styles from "@checkRequest/CheckRequest.module.css";
import TitleBar from "@titlebar/TitleBar";
import Paper from "@mui/material/Paper";
import { Form, Radio, Row, Col, Button, Space, Result, Progress } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

function ResultPage() {
  const [postID, setPostID] = useState(
    parseInt(window.location.pathname.replace(/[^0-9]/g, ""))
  );
  const [disabled, setDisabled] = useState(true);
  const [checkValue, setCheckValue] = useState(2);
  const [values, setValues] = useState();
  const [requestID, setRequestID] = useState();
  const [selectedNum, setSelectedNum] = useState();
  const [show, setShow] = useState(0);

  const toggleDisabled = () => {
    setDisabled(!disabled);
  };

  const onChange = (e) => {
    setCheckValue(e.target.value);
    if (e.target.value === 1) {
      setShow(1);
    }
  };

  const onChangeSelectedNum = (e) => {
    setSelectedNum(e.target.value);
  };

  const handleEncodingStart = (e) => {
    setShow(2);
  };

  const handleSubmit = (values) => {
    // console.log(checkValue); // 적절성 체크 (1 or 2)
    if (checkValue === 1) {
      // 적절
      let variables = {
        check: checkValue === 1 ? 1 : -1,
        requestID: requestID,
        selectedNum: selectedNum,
      };

      Axios.post(`master/selectChild/`, variables)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            alert("작성 완료되었습니다.");
            window.location.reload();
          } else {
            alert("POST failed");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // 부적절
      let variables = {
        postID: postID,
        check: checkValue === 1 ? 1 : -1,
      };

      Axios.post(`master/confirmRequest/${postID}/`, variables)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            alert("작성 완료되었습니다.");
            window.location.reload();
          } else {
            alert("POST failed");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    let variables = {
      postID: postID,
    };

    Axios.post(`master/checkRequest/${postID}/`, variables)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setValues(res.data);
          setRequestID(res.data.request_id);
        } else {
          alert("GET failed");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.container}>
      <Paper className={styles.paper} elevation={0}>
        <TitleBar title_name="Check Request" />
        <div className={styles.inner}>
          <div className={styles.description}>
            학부모의 반출 요청을 확인하고, 적절한 사유가 작성된 요청에 대한 영상
            암호화 처리를 진행합니다.
          </div>
          {values && (
            <div className={styles.outer_box}>
              요청 학부모 <span style={{ paddingLeft: "67px" }} />
              {values.user_name} <div />
              요청 날짜 <span style={{ paddingLeft: "80px" }} />
              {values.request_date} <div />
              어린이집 이름 <span style={{ paddingLeft: "54px" }} />
              {values.center_name} <div />
              선택된 날짜 <span style={{ paddingLeft: "67px" }} />
              {values.date}
              <div /> 아동 이름 <span style={{ paddingLeft: "80px" }} />
              {values.child_name} <div />
              사유
              <span style={{ paddingLeft: "115px" }} />
              {values.request_reason}
            </div>
          )}
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
          {show === 1 && (
            <Button
              type="primary"
              className={styles.encodingBtn}
              onClick={handleEncodingStart}
            >
              암호화 시작
            </Button>
          )}
          {show === 2 && (
            <Row gutter={[16, 16]}>
              <Col span={14}>
                <div className={styles.video}></div>
              </Col>
              <Col span={10}>
                <Radio.Group onChange={onChangeSelectedNum} value={selectedNum}>
                  <Space direction="vertical">
                    <Radio value={1}>Option A</Radio>
                    <Radio value={2}>Option B</Radio>
                    <Radio value={3}>Option C</Radio>
                  </Space>
                </Radio.Group>
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
          )}
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
