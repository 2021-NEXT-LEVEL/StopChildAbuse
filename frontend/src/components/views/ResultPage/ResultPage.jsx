import React, { useState, useEffect } from "react";
import Axios from "@api/index";
import { useHistory } from "react-router-dom";
import styles from "@result/ResultPage.module.css";
import TitleBar from "@titlebar/TitleBar";
import Paper from "@mui/material/Paper";
import { Input, Row, Col, Button, Form } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

function ResultPage() {
  const [postID, setPostID] = useState(
    parseInt(window.location.pathname.replace(/[^0-9]/g, ""))
  );
  const [requestDate, setRequestDate] = useState();
  const [centerName, setCenterName] = useState();
  const [date, setDate] = useState();
  const [childName, setChildName] = useState();
  const [requestReason, setRequestReason] = useState();
  const [decodingKey, setDecodingKey] = useState();
  const [output, setOutput] = useState();
  const [show, setShow] = useState(0);

  const history = useHistory();

  const onFinish = (values) => {
    if (values.decoding_key === decodingKey) {
      setShow(1);
    } else {
      window.alert("복호화 키를 다시 입력하세요.");
    }
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
          console.log("GET success");
          setRequestDate(res.data.request_date);
          setCenterName(res.data.center_name);
          setDate(res.data.date);
          setChildName(res.data.child_name);
          setRequestReason(res.data.request_reason);
          setDecodingKey(res.data.decodingKey);
          setOutput(res.data.ouput_source);
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
        <TitleBar title_name="Request" />
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
          <div className={styles.outer_box}>
            아동 복호화 키 <span style={{ paddingLeft: "120px" }} />
            <font>{decodingKey}</font> <div />
            <font style={{ color: "red", fontSize: "0.9em" }}>
              (주의: 타인에게 노출되지 않도록 주의하시기 바랍니다.)
            </font>
          </div>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <div className={styles.keyInput}>
                <Form onFinish={onFinish}>
                  <b>복호화 키 입력</b>
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
          <Button
            size="large"
            className={styles.submitBtn}
            onClick={() => history.push("/user/result")}
          >
            나가기
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default ResultPage;
