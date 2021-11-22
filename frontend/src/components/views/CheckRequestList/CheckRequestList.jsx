import React, { useState, useEffect } from "react";
import Axios from "@api/index";
import styles from "@checkRequestList/CheckRequestList.module.css";
import { useHistory } from "react-router-dom";
import TitleBar from "@titlebar/TitleBar";
import Paper from "@mui/material/Paper";
import { Input, DatePicker, Button, Pagination, Table } from "antd";
import { ListData } from "@checkRequestList/sections/ListData";

function CheckRequestList() {
  const history = useHistory();
  const [rowCount, setRowCount] = useState();
  const [listData, setListData] = useState([]);
  const moveResultPage = (idx) => {
    history.push(`/master/checkRequest/${idx}`);
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      width: 100,
    },
    {
      title: "요청 학부모",
      dataIndex: "user_name",
      width: 200,
    },
    {
      title: "어린이집 이름",
      dataIndex: "center_name",
      width: 300,
    },
    {
      title: "요청 날짜",
      dataIndex: "date",
    },
    {
      title: "진행 상황",
      dataIndex: "process_state",
      width: 150,
    },
  ];

  const setList = (list) => {
    list.map((item, idx) => {
      item.no = idx + 1;

      if (item.process_state === 0 || item.process_state === "승인대기") {
        item.process_state = "승인대기";
      } else if (item.process_state === 1 || item.process_state === "완료") {
        item.process_state = "완료";
      } else {
        item.process_state = "승인거부";
      }
    });
    return list;
  };

  useEffect(() => {
    Axios.get("master/checkRequest/").then((res) => {
      if (res.status === 200) {
        setRowCount(res.data.length);
        setListData(res.data.reverse());
      } else {
        alert("register failed");
      }
    });
  }, []);

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
              dataSource={setList(listData).reverse()}
              pagination={{ pageSize: 10 }}
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    moveResultPage(rowCount - rowIndex);
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
