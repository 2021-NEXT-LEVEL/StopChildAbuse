import React, { useState, useEffect } from "react";
import Axios from "@api/index";
import { useHistory } from "react-router-dom";
import styles from "@result/ResultPage.module.css";
import TitleBar from "@titlebar/TitleBar";
import Paper from "@mui/material/Paper";
import { Input, Row, Col, Button, Form, Result } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

function ResultPage() {
  const [postID, setPostID] = useState(
    parseInt(window.location.pathname.replace(/[^0-9]/g, ""))
  );
  const [requestID, setRequestID] = useState();
  const [requestDate, setRequestDate] = useState();
  const [centerName, setCenterName] = useState();
  const [date, setDate] = useState();
  const [childName, setChildName] = useState();
  const [requestReason, setRequestReason] = useState();
  const [decodingKey, setDecodingKey] = useState();
  const [output, setOutput] = useState();
  const [checkValue, setCheckValue] = useState();
  const [rejectReason, setRejectReason] = useState();
  const [show, setShow] = useState(0);

  const history = useHistory();

  const onFinish = (values) => {
    // 입력창에 키를 입력했을 떄
    let variables = {
      input: values.decoding_key,
      request_id: requestID,
    };

    Axios.post(`user/userDecode/`, variables)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          if (res.data.message === "correct") {
            setShow(1);
          } else {
            window.alert("키가 일치하지 않습니다.");
          }
        } else {
          alert("GET failed");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let variables = {
      session_id: localStorage.getItem("id"),
      postID: postID,
    };

    Axios.post(`user/result/${postID}/`, variables)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setRequestDate(res.data.req.request_date);
          setCenterName(res.data.req.center_name);
          setDate(res.data.req.date);
          setChildName(res.data.req.child_name);
          setRequestReason(res.data.req.request_reason);
          setDecodingKey(res.data.encrypt);
          setOutput(res.data.req.ouput_source);
          setCheckValue(res.data.req.check);
          setRequestID(res.data.req.request_id);
          setRejectReason(res.data.req.reject_reason);
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
        <TitleBar title_name="요청 결과" />
        <div className={styles.inner}>
          <div className={styles.description}>
            반출 요청 및 처리 된 영상을 확인한 뒤 다운로드가 가능합니다.
          </div>
          <div className={styles.outer_box}>
            요청 날짜 <span style={{ paddingLeft: "80px" }} />
            {requestDate} <div />
            어린이집 이름 <span style={{ paddingLeft: "54px" }} />
            {centerName} <div />
            선택된 날짜 <span style={{ paddingLeft: "67px" }} />
            {date}
            <div /> 아동 이름 <span style={{ paddingLeft: "80px" }} />
            {childName} <div />
            사유
            <span style={{ paddingLeft: "115px" }} />
            {requestReason}
          </div>
          {checkValue === 1 ? (
            <>
              <div className={styles.outer_box}>
                아동 암호화 키 <span style={{ paddingLeft: "120px" }} />
                <font>{decodingKey}</font> <div />
                <font style={{ color: "red", fontSize: "0.9em" }}>
                  (주의: 타인에게 노출되지 않도록 주의하시기 바랍니다.)
                </font>
              </div>
              <div className={styles.outer_box}>
                <Result status="success" title="승인 완료되었습니다." />
              </div>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <div className={styles.keyInput}>
                    <Form onFinish={onFinish}>
                      <b>암호화 키 입력</b>
                      <div>
                        <Form.Item name="decoding_key">
                          <Input style={{ width: "75%" }} />
                        </Form.Item>
                      </div>
                      <Button
                        type="primary"
                        className={styles.inputBtn}
                        htmlType="submit"
                      >
                        입력
                      </Button>
                    </Form>
                    {show === 1 && (
                      <>
                        <div>Download 버튼 클릭 시 영상이 다운됩니다.</div>
                        <Button
                          type="primary"
                          icon={<DownloadOutlined />}
                          size="large"
                          className={styles.downloadButton}
                        >
                          Download
                        </Button>
                      </>
                    )}
                  </div>
                </Col>
                <Col span={10}></Col>
              </Row>
            </>
          ) : checkValue === 0 ? (
            <div className={styles.outer_box}>
              <Result title="승인 대기 중입니다." />
            </div>
          ) : (
            <>
              <div className={styles.outer_box}>
                <Result status="error" title="승인 거절되었습니다." />
              </div>
              <div style={{ paddingBottom: "10px" }}>거절 사유</div>
              <div className={styles.outer_box}>
                <div>{rejectReason}</div>
              </div>
            </>
          )}
          <Button
            size="large"
            className={styles.submitBtn}
            onClick={() => window.location.replace("/user/result")}
          >
            나가기
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default ResultPage;
