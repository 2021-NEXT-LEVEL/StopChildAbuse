import React, { useState, useEffect } from "react";
import styles from "@resultlist/ResultList.module.css";
import { useHistory } from "react-router-dom";
import TitleBar from "@titlebar/TitleBar";
import Paper from "@mui/material/Paper";
import { Input, DatePicker, Button, Pagination, Table } from "antd";
import { ListData } from "@resultlist/sections/ListData";

function ResultList() {
  const history = useHistory();
  const { RangePicker } = DatePicker;
  const { TextArea } = Input;
  const [cnt, setCnt] = useState(10 - ListData.length);
  const onChange = () => {};
  const moveResultPage = (idx) => {
    history.push(`/result/${idx}`);
  };
  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      width: 100,
    },
    {
      title: "어린이집 이름",
      dataIndex: "name",
      width: 400,
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
        <TitleBar title_name="Result" />
        <div className={styles.inner}>
          <div className={styles.description}>
            사용자 본인의 요청 리스트 및 진행 상황을 확인 가능합니다.
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

export default ResultList;
