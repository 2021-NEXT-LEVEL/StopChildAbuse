import React, { useState, useEffect } from "react";
import Axios from "@api/index";
import styles from "@checkRequest/CheckRequest.module.css";
import TitleBar from "@titlebar/TitleBar";
import Paper from "@mui/material/Paper";
import { Radio, Row, Col, Button, Space, Input, Result } from "antd";

function ResultPage() {
  const [postID, setPostID] = useState(
    parseInt(window.location.pathname.replace(/[^0-9]/g, ""))
  );
  const [disabled, setDisabled] = useState(true);
  const [checkValue, setCheckValue] = useState(0);
  const [values, setValues] = useState();
  const [requestID, setRequestID] = useState();
  const [selectedNum, setSelectedNum] = useState();
  const [show, setShow] = useState(-1);
  const [rejectReason, setRejectReason] = useState();
  const { TextArea } = Input;

  const toggleDisabled = () => {
    setDisabled(!disabled);
  };

  const onChange = (e) => {
    setCheckValue(e.target.value);
    console.log(e.target.value);
    if (e.target.value === 1) {
      setShow(1);
    } else {
      setShow(0);
    }
  };

  const onChangeSelectedNum = (e) => {
    setSelectedNum(e.target.value);
  };

  const onInputRejectReason = (e) => {
    setRejectReason(e.target.value);
  };

  const handleSubmit = (values) => {
    // console.log(checkValue); // 적절성 체크 (1 or 2)
    if (checkValue === 1) {
      // 적절
      let variables = {
        check: checkValue === 1 ? 1 : -1,
        request_id: requestID,
        selectedNum: selectedNum,
      };

      Axios.post(`master/allowRequest/`, variables)
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
        reject_reason: rejectReason,
      };

      Axios.post(`master/rejectRequest/${postID}/`, variables)
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
        if (res.status === 200) {
          console.log(res.data.req);
          setValues(res.data.req);
          setRequestID(res.data.req.request_id);
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
        <TitleBar title_name="요청 확인" />
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
            {values && values.check === 0 ? (
              <Button
                type="primary"
                onClick={toggleDisabled}
                style={{ marginTop: 16 }}
              >
                적절성 유무 판단
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={toggleDisabled}
                disabled
                style={{ marginTop: 16 }}
              >
                적절성 유무 판단
              </Button>
            )}
          </div>
          {values && values.check === -1 ? (
            <div className={styles.outer_box}>
              <Result status="error" title="승인 거절되었습니다." />
            </div>
          ) : values && values.check === 1 ? (
            <div className={styles.outer_box}>
              <Result status="success" title="승인 완료되었습니다." />
            </div>
          ) : (
            <></>
          )}
          {/* 적절성 체크 no인 경우  */}
          {show === 0 && (
            <div className={styles.outer_box}>
              <div style={{ paddingBottom: "10px" }}>부적절 사유 입력</div>
              <div>
                <TextArea
                  showCount
                  maxLength={200}
                  onChange={onInputRejectReason}
                  className={styles.textarea}
                />
              </div>
            </div>
          )}
          {/* 적절성 체크 yes인 경우 */}
          {show === 1 && (
            <Row gutter={[16, 16]}>
              <Col span={14}>
                <div className={styles.video}>
                  {/* <img src="/assets/sample.png" className={styles.video_img}/> */}
                </div>
              </Col>
              <Col span={10}>
                <div style={{ paddingBottom: "10px" }}>
                  암호화에서 제외할 학부모 자녀의 인덱스를 선택하세요.
                </div>
                <Radio.Group onChange={onChangeSelectedNum} value={selectedNum}>
                  <Space direction="vertical">
                    <Radio value={1}>1</Radio>
                    <Radio value={2}>2</Radio>
                    <Radio value={3}>3</Radio>
                    <Radio value={4}>4</Radio>
                  </Space>
                </Radio.Group>
              </Col>
            </Row>
          )}
          <div className={styles.bottomBtn}>
            <Button
              size="large"
              className={styles.submitBtn}
              onClick={() => window.location.replace("/master/main")}
            >
              나가기
            </Button>
            {values && values.check === 0 ? (
              <Button
                type="primary"
                size="large"
                className={styles.submitBtn}
                onClick={handleSubmit}
              >
                제출
              </Button>
            ) : (
              <Button
                type="primary"
                size="large"
                className={styles.submitBtn}
                onClick={handleSubmit}
                disabled
              >
                제출
              </Button>
            )}
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default ResultPage;
