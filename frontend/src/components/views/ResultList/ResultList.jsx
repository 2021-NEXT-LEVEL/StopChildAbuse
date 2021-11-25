import React, { useState, useEffect } from "react";
import Axios from "@api/index";
import styles from "@resultlist/ResultList.module.css";
import { useHistory } from "react-router-dom";
import TitleBar from "@titlebar/TitleBar";
import Paper from "@mui/material/Paper";
import { Input, DatePicker, Button, Pagination, Table } from "antd";

function ResultList() {
  const [listData, setListData] = useState();
  const [rowCount, setRowCount] = useState();
  const history = useHistory();
  const moveResultPage = (idx) => {
    window.location.replace(`/user/result/${idx}`);
  };
  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      width: 100,
    },
    {
      title: "어린이집 이름",
      dataIndex: "center_name",
      width: 400,
    },
    {
      title: "요청 날짜",
      dataIndex: "date",
    },
    {
      title: "진행 상황",
      dataIndex: "check",
      width: 150,
    },
  ];

  const setList = (list) => {
    console.log(list);
    list.map((item, idx) => {
      item.no = idx + 1;

      if (item.check === 0 || item.check === "승인대기") {
        item.check = "승인대기";
      } else if (item.check === 1 || item.check === "완료") {
        item.check = "완료";
      } else {
        item.check = "승인거부";
      }
    });
    return list;
  };

  useEffect(() => {
    let variables = {
      session_id: localStorage.getItem("id"),
    };

    Axios.post("user/result/", variables)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setRowCount(res.data.length);
          setListData(res.data.reverse());
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
            사용자 본인의 요청 리스트 및 진행 상황을 확인 가능합니다.
          </div>
          <div className={styles.outer_box}>
            {listData && (
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
            )}
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default ResultList;
