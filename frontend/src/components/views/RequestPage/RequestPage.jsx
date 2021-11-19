import React from "react";
import Axios from "@api/index";
import styles from "@requestpage/RequestPage.module.css";
import TitleBar from "@titlebar/TitleBar";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { Form, Input, DatePicker, Button } from "antd";

function RequestPage() {
  const { TextArea } = Input;
  const dateFormat = "YYYY-MM-DD";
  const onFinish = (values) => {
    let current = new Date();
    let variables = {
      session_id: localStorage.getItem("id"),
      request_date: moment(values.request_date._d).format("YYYY-MM-DD"),
      center_name: values.center_name,
      date: moment(current).format("YYYY-MM-DD"),
      child_name: values.child_name,
      request_reason: values.request_reason,
      process_state: "0",
      check: "0",
    };
    console.log(variables);
    console.log(moment(values.request_date._d, dateFormat));

    Axios.post("user/request/", variables).then((res) => {
      console.log(res);
      if (res.status === 200) {
        console.log("Request success");
      } else {
        alert("Request failed");
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles.container}>
      <Paper className={styles.paper} elevation={0}>
        <TitleBar title_name="Request" />
        <div className={styles.inner}>
          <div className={styles.description}>
            아동학대 의심 정황 발생 시, CCTV 영상 반출을 요청할 수 있습니다.
          </div>
          <div className={styles.warning}>주의</div>
          <div className={styles.warning_text}>
            <div>
              해당 사이트는 학부모가 자녀의 안전을 확인할 목적으로 CCTV 영상 속
              자녀를 제외하고 모자이크 처리된 영상을 받아볼 수 있습니다.
            </div>
            <div style={{ color: "#FF0000" }}>
              단순한 영상 열람의 목적으로 서비스를 이용하지 않도록 주의
              부탁드립니다.
            </div>
          </div>
          <Form
            name="request_form"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <div className={styles.questionBox}>
              <div className={styles.box}>
                Q. 어린이집 이름
                <p />
                <Form.Item name="center_name">
                  <Input style={{ width: "28.5%" }} />
                </Form.Item>
              </div>
              <div className={styles.box}>
                Q. 날짜 선택
                <p />
                <Form.Item name="request_date">
                  <DatePicker />
                </Form.Item>
              </div>
              <div className={styles.box}>
                Q. 아동 이름
                <p />
                <Form.Item name="child_name">
                  <Input style={{ width: "28.5%" }} />
                </Form.Item>
              </div>
              <div className={styles.box}>
                Q. 해당 서비스를 사용하려는 목적에 대해 자세하게 기술하시오.
                정당한 요구가 아닐 시 반출이 거부될 수 있습니다.
                <p />
                <Form.Item name="request_reason">
                  <TextArea rows={5} style={{ width: "80%" }} />
                </Form.Item>
              </div>
              <Button
                type="primary"
                size="large"
                className={styles.submitBtn}
                htmlType="submit"
              >
                제출
              </Button>
            </div>
          </Form>
        </div>
      </Paper>
    </div>
  );
}

export default RequestPage;