import React, { Fragment } from "react";
import styles from "@documents/Documents.module.css";
import TitleBar from "@titlebar/TitleBar";
import Paper from "@mui/material/Paper";
import { Card, Divider, Row, Col, Button, Steps } from "antd";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

function Documents() {
  const docs = [
    {
      title: "1. [요청하기] 페이지에 접근합니다.",
      src: "/assets/documents/user-request-1.png",
      extra: "/user/request",
    },
    {
      title: "2. 시스템에 요청할 CCTV 자료의 정보를 입력하고 제출합니다.",
      src: "/assets/documents/user-request-2.png",
    },
    {
      title: "3. [요청 결과] 페이지에 접근합니다.",
      src: "/assets/documents/user-result-1.png",
      extra: "/user/result",
    },
    {
      title:
        "4. 해당 페이지에서는 사용자의 요청 목록과 진행 상황에 대한 확인이 가능합니다.",
      src: "/assets/documents/user-result-2.png",
    },
    {
      title: "5-1. 아직 관리자가 확인하지 않은 요청 내역일 시",
      src: "/assets/documents/user-result-wait.png",
    },
    {
      title: "5-2. 관리자가 승인 거부를 선택할 시 ",
      src: "/assets/documents/user-result-reject.png",
    },
    {
      title:
        "5-3. 승인 완료 시, 제공된 암호화 키를 입력해 영상을 다운로드 받을 수 있습니다.",
      src: "/assets/documents/user-result-allow-2.png",
    },
  ];
  return (
    <div className={styles.container}>
      <Paper className={styles.paper} elevation={0}>
        <TitleBar title_name="웹사이트 소개" />
        <div className={styles.inner}>
          <div className={styles.description}>
            해당 서비스에 대한 간단한 소개와 이용방법을 안내합니다.
          </div>
          <Divider />
          <div className={styles.contents}>
            <img className={styles.logo} src="/assets/logo2.png" />
            <div>
              <i>ChildKeeper</i>는 어린이집 내에서 아동학대가 의심되어 학부모가
              CCTV 영상 반출을 요청할 경우,{" "}
            </div>
            <div>
              필수적인 처리 과정인 모자이크 과정을 자동화시키는 솔루션을
              제안합니다.
            </div>
            <div>
              학부모가 요청한 영상에 대해 자녀를 제외한 모든 사람의 얼굴을
              모자이크처리한 영상을 다운 받을 수 있습니다.
            </div>
            <div>
              또한, 자녀의 암호화 코드를 영상 별로 생성해 해당 키를 이용해
              복호화 과정이 이루어지기 때문에
            </div>
            <div> 영상 열람 시 민감한 프라이버시 문제 해결이 가능합니다.</div>
          </div>
          <Divider />
          <div className={styles.progress}>
            {docs.map((item, idx) => (
              <Fragment key={idx}>
                {item.extra ? (
                  <Card
                    title={item.title}
                    extra={<a href={item.extra}>바로가기</a>}
                    style={{ width: 800 }}
                  >
                    <img src={item.src} className={styles.image} />
                  </Card>
                ) : (
                  <Card title={item.title} style={{ width: 800 }}>
                    <img src={item.src} className={styles.image} />
                  </Card>
                )}
                {!item.title.startsWith("5-3") && (
                  <ArrowDownwardIcon className={styles.arrowDown} />
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default Documents;
