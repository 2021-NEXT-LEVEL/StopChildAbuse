import React, { useState, useEffect } from "react";
import Axios from "@api/index";
import moment from "moment";
import { useHistory } from "react-router-dom";
import styles from "@adminMain/AdminMainPage.module.css";
import CheckRequestList from "@checkRequestList/CheckRequestList";
import UserInfoList from "@userInfoList/UserInfoList";
import { Statistic, Card, Row, Col, Result, Button } from "antd";
import Paper from "@mui/material/Paper";

function AdminMainPage() {
  const history = useHistory();
  const [todayRequest, setTodayRequest] = useState();
  const [totalUser, setTotalUser] = useState();
  const [totalRequest, setTotalRequest] = useState();
  const [allow, setAllow] = useState();
  const [wait, setWait] = useState();

  useEffect(() => {
    Axios.get("master/checkRequest/").then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        let cnt = 0;
        let allow = 0;
        let today = 0;
        res.data.map((item, idx) => {
          if (item.check === 0) cnt += 1;
          else if (item.check === 1) allow += 1;
          if (item.date === moment(new Date()).format("YYYY-MM-DD")) today += 1;
        });
        setWait(cnt);
        setAllow(allow);
        setTotalRequest(res.data);
        setTodayRequest(today);
        setTotalUser(res.data.length - 1);
      }
    });

    // Axios.get("master/getUserList/").then((res) => {
    //   if (res.status === 200) {
    //     console.log(res);
    //   } else {
    //     alert("register failed");
    //   }
    // });
  }, []);

  return (
    <div className={styles.container}>
      {totalRequest && (
        <Row gutter={16} className={styles.top_row}>
          <Col span={6} className={styles.stat_col}>
            <Card>
              <Statistic
                title="전체 사용자 수"
                value={totalUser}
                valueStyle={{ fontWeight: "bold" }}
                suffix="명"
              />
            </Card>
          </Col>
          <Col span={6} className={styles.stat_col}>
            <Card>
              <Statistic
                title="오늘 요청 수"
                value={todayRequest}
                valueStyle={{ fontWeight: "bold" }}
                suffix="개"
              />
            </Card>
          </Col>
          <Col span={6} className={styles.stat_col}>
            <Card>
              <Statistic
                title="승인 대기 수"
                value={wait + " / " + totalRequest.length}
                valueStyle={{ color: "#4b89dc", fontWeight: "bold" }}
              />
            </Card>
          </Col>
          <Col span={6} className={styles.stat_col}>
            <Card>
              {totalRequest.length === 0 ? (
                <Statistic
                  title="전체 승인률"
                  value={0}
                  precision={2}
                  valueStyle={{ color: "#3f8600", fontWeight: "bold" }}
                  suffix="%"
                />
              ) : (
                <Statistic
                  title="전체 승인률"
                  value={(allow / totalRequest.length) * 100}
                  precision={2}
                  valueStyle={{ color: "#3f8600", fontWeight: "bold" }}
                  suffix="%"
                />
              )}
            </Card>
          </Col>
        </Row>
      )}
      <Paper className={styles.paper_list}>
        <CheckRequestList />
      </Paper>
      <Paper className={styles.paper_list}>
        <UserInfoList />
      </Paper>
    </div>
  );
}

export default AdminMainPage;
