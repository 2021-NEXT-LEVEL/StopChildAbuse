import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "@navbar/NavBar.module.css";
import { Layout, Menu, Dropdown } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
const { Header } = Layout;

function NavBar() {
  const history = useHistory();
  const [state, setState] = useState(0);
  const nonlogin_menu = ["Documents"]; // 0
  const user_menu = ["Documents", "Request", "Result"]; // 1
  const admin_menu = ["요청확인"]; // 2
  const user_url = ["/user/documents", "/user/request", "/user/result"];
  const admin_url = ["/master/checkRequest", "/master/checkResult"];
  const movePage = (url) => {
    history.push(url);
  };

  const logout = () => {
    window.location.replace("/");
  };
  const menu = (
    <Menu>
      <Menu.Item key={1}>
        <span onClick={() => logout()}>
          <LogoutOutlined style={{ paddingRight: "10px" }} />
          Logout
        </span>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    if (localStorage.length === 0) setState(0);
    else if (localStorage.name === "admin") setState(2);
    else setState(1);
  }, []);

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
        {state === 0 && (
          <div className={styles.logo} onClick={() => movePage("/")} />
        )}
        {state === 1 && (
          <div className={styles.logo} onClick={() => movePage("/user/main")} />
        )}
        {state === 2 && (
          <div
            className={styles.logo}
            onClick={() => movePage("/master/main")}
          />
        )}
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["0"]}
          style={{ backgroundColor: "#3E9794" }}
        >
          {localStorage.length === 0
            ? nonlogin_menu.map((submenu, idx) => {
                const key = idx;
                return (
                  <Menu.Item key={key} onClick={() => movePage("/documents")}>
                    {submenu}
                  </Menu.Item>
                );
              })
            : localStorage.name !== "admin"
            ? user_menu.map((submenu, idx) => {
                const key = idx;
                return (
                  <Menu.Item key={key} onClick={() => movePage(user_url[idx])}>
                    {submenu}
                  </Menu.Item>
                );
              })
            : admin_menu.map((submenu, idx) => {
                const key = idx;
                return (
                  <Menu.Item key={key} onClick={() => movePage(admin_url[idx])}>
                    {submenu}
                  </Menu.Item>
                );
              })}

          {localStorage.length > 0 ? (
            <Dropdown overlay={menu}>
              <div className={styles.loginBtn}>
                <span>{localStorage.name}님 안녕하세요!</span>
              </div>
            </Dropdown>
          ) : (
            <div className={styles.loginBtn} onClick={() => movePage("/")}>
              <span>로그인하시겠습니까?</span>
            </div>
          )}
          <div className={styles.loginBtn} onClick={() => movePage("/")}></div>
        </Menu>
      </Header>
    </div>
  );
}

export default NavBar;
