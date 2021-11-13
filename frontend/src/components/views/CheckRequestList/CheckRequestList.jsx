import React, { useState, useEffect } from "react";
import styles from "@checkRequestList/CheckRequestList.module.css";
import { useHistory } from "react-router-dom";
import TitleBar from "@titlebar/TitleBar";
import Paper from "@mui/material/Paper";
import { Input, DatePicker, Button, Pagination, Table } from "antd";
import { ListData } from "@checkRequestList/sections/ListData";

function CheckRequestList() {
  const history = useHistory();
  const [cnt, setCnt] = useState(10 - ListData.length);
  const onChange = () => {};
  const moveResultPage = (idx) => {
    history.push(`/checkRequest/${idx}`);
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      width: 100,
    },
    {
      title: "요청 학부모",
      dataIndex: "name",
      width: 200,
    },
    {
      title: "어린이집 이름",
      dataIndex: "name",
      width: 300,
    },
    {
      title: "요청 날짜",
      dataIndex: "date",
    },
    {
      title: "진행 상황",
      dataIndex: "progress",
      width: 150,
    },
  ];

  return (
    <div className={styles.container}>
      <Paper className={styles.paper} elevation={0}>
        <TitleBar title_name="Check Request" />
        <div className={styles.inner}>
          <div className={styles.description}>
            전체 학부모의 요청 리스트 및 진행 상황을 확인 가능합니다.
          </div>
          <div className={styles.outer_box}>
            <Table
              rowClassName={styles.table_row}
              size="small"
              columns={columns}
              dataSource={ListData}
              pagination={{ pageSize: 10 }}
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    moveResultPage(rowIndex + 1);
                  },
                };
              }}
            />
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default CheckRequestList;
