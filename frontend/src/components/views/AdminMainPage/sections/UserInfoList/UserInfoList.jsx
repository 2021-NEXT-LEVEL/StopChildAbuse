import React, { useState, useEffect } from "react";
import Axios from "@api/index";
import styles from "@checkRequestList/CheckRequestList.module.css";
import { useHistory } from "react-router-dom";
import TitleBar from "@titlebar/TitleBar";
import { Input, DatePicker, Button, Pagination, Table } from "antd";

function UserInfoList() {
  const history = useHistory();
  const [rowCount, setRowCount] = useState();
  const [listData, setListData] = useState([]);
  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      width: 100,
    },
    {
      title: "학부모 이름",
      dataIndex: "name",
      width: 300,
    },

    {
      title: "이메일",
      dataIndex: "email",
      width: 400,
    },
    {
      title: "핸드폰번호",
      dataIndex: "phone",
      width: 400,
    },
    {
      title: "자녀 이름",
      dataIndex: "child_name",
      width: 300,
    },
  ];

  const setList = (list) => {
    list.map((item, idx) => {
      item.no = idx + 1;
    });
    return list;
  };

  useEffect(() => {
    Axios.get("master/getUserList/").then((res) => {
      if (res.status === 200) {
        setListData(res.data.slice(0, res.data.length - 1));
      } else {
        alert("register failed");
      }
    });
  }, []);

  return (
    <>
      <TitleBar title_name="회원 정보" />
      <div className={styles.inner}>
        <div className={styles.description}>
          전체 가입된 학부모의 정보를 확인 가능합니다.
        </div>
        <div className={styles.outer_box}>
          <Table
            rowClassName={styles.table_row}
            size="small"
            columns={columns}
            dataSource={setList(listData)}
            pagination={{ pageSize: 10 }}
          />
        </div>
      </div>
    </>
  );
}

export default UserInfoList;
