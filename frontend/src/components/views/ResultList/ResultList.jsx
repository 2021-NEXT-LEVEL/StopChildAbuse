import React, { useState, useEffect } from "react";
import styles from "@resultlist/ResultList.module.css";
import { useHistory } from "react-router-dom";
import TitleBar from "@titlebar/TitleBar";
import Paper from "@mui/material/Paper";
import { Input, DatePicker, Button, Pagination } from "antd";
import { ChakraProvider } from "@chakra-ui/react";
import { ListData } from "@resultlist/sections/ListData";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

function ResultList() {
  const history = useHistory();
  const { RangePicker } = DatePicker;
  const { TextArea } = Input;
  const [cnt, setCnt] = useState(10 - ListData.length);
  const onChange = () => {};
  const moveResultPage = (idx) => {
    history.push(`/result/${idx}`);
  };

  return (
    <div className={styles.container}>
      <Paper className={styles.paper} elevation={0}>
        <TitleBar title_name="Result" />
        <div className={styles.inner}>
          <div className={styles.description}>
            사용자 본인의 요청 리스트 및 진행 상황을 확인 가능합니다.
          </div>
          <div className={styles.outer_box}>
            <ChakraProvider>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>No.</Th>
                    <Th>어린이집 이름</Th>
                    <Th>요청 날짜</Th>
                    <Th>진행 상황</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {ListData.reverse().map((data, index) => (
                    <Tr
                      key={index}
                      onClick={() => moveResultPage(index + 1)}
                      className={styles.table_tr}
                    >
                      <Td>{index + 1}</Td>
                      <Td>{data.name}</Td>
                      <Td>{data.date}</Td>
                      <Td>{data.progress}</Td>
                    </Tr>
                  ))}
                  {new Array(cnt).fill(undefined).map((_, index) => (
                    <Tr key={index}>
                      <Td>&nbsp;</Td>
                      <Td> </Td>
                      <Td> </Td>
                      <Td> </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </ChakraProvider>
          </div>
          <Pagination
            size="small"
            onChange={onChange}
            defaultCurrent={1}
            total={10}
            className={styles.pagination}
          />
        </div>
      </Paper>
    </div>
  );
}

export default ResultList;
