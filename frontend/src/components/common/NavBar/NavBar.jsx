import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "@navbar/NavBar.module.css";
import { Layout, Menu } from "antd";
const { Header } = Layout;

function NavBar() {
  const history = useHistory();
  const [state, setstate] = useState(0);
  const nonlogin_menu = ["Documents"]; // 0
  const user_menu = ["Documents", "Request", "Result"]; // 1
  const admin_menu = ["Check Request", "Check Result"]; // 2
  const user_url = ["/user/documents", "/user/request", "/user/result"];
  const admin_url = ["/master/checkRequest", "/master/checkResult"];
  const movePage = (url) => {
    history.push(url);
  };
  return (
    <div>
      <Header
        style={{
          backgroundColor: "#3E9794",
          position: "fixed",
          zIndex: 1,
          width: "100%",
        }}
      >
        <div className={styles.logo} onClick={() => movePage("/")} />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["0"]}
          style={{ backgroundColor: "#3E9794" }}
        >
          {state === 0 &&
            user_menu.map((submenu, idx) => {
              const key = idx;
              return (
                <Menu.Item key={key} onClick={() => movePage(user_url[idx])}>
                  {submenu}
                </Menu.Item>
              );
            })}
          {state === 1 &&
            user_menu.map((submenu, idx) => {
              const key = idx;
              return (
                <Menu.Item key={key} onClick={() => movePage(user_url[idx])}>
                  {submenu}
                </Menu.Item>
              );
            })}
          {state === 2 &&
            admin_menu.map((submenu, idx) => {
              const key = idx;
              return (
                <Menu.Item key={key} onClick={() => movePage(admin_url[idx])}>
                  {submenu}
                </Menu.Item>
              );
            })}
          <div className={styles.loginBtn} onClick={() => movePage("/")}>
            로그인하시겠습니까?
          </div>
        </Menu>
      </Header>
    </div>
  );
}

export default NavBar;
