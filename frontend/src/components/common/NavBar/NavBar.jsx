import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "@navbar/NavBar.module.css";
import { Layout, Menu, Dropdown } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
const { Header } = Layout;

function NavBar() {
  const history = useHistory();
  const [state, setState] = useState(0);
  const [currentURL, setCurrentURL] = useState(window.location.pathname);
  const [selectedKey, setSelectedKey] = useState();
  const nonlogin_menu = ["웹사이트 소개"]; // 0
  const user_menu = ["웹사이트 소개", "요청하기", "요청 결과"]; // 1
  const admin_menu = []; // 2
  const user_url = ["/user/documents", "/user/request", "/user/result"];
  const admin_url = [];
  const movePage = (url) => {
    // history.push(url);
    window.location.replace(url);
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
    // console.log(localStorage);
    // console.log(window.location.pathname.endsWith("/main"));
    setCurrentURL(window.location.pathname);

    if (localStorage.length === 0) {
      setState(0);
      if (currentURL.endsWith("/documents")) {
        setSelectedKey("1");
        console.log("hi");
      } else setSelectedKey("0");
    } else if (localStorage.name === "관리자") {
      setState(2);
    } else {
      setState(1);
    }
    console.log("여기:", selectedKey);
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
          <div className={styles.logo} onClick={() => movePage("/")}>
            <img src="/assets/logo.png" className={styles.logoImg} />
          </div>
        )}
        {state === 1 && (
          <div className={styles.logo} onClick={() => movePage("/user/main")}>
            <img src="/assets/logo.png" className={styles.logoImg} />
          </div>
        )}
        {state === 2 && (
          <div className={styles.logo} onClick={() => movePage("/master/main")}>
            <img src="/assets/logo.png" className={styles.logoImg} />
          </div>
        )}
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[selectedKey]}
          style={{ backgroundColor: "#3E9794" }}
        >
          {localStorage.length === 0
            ? nonlogin_menu.map((submenu, idx) => {
                const key = idx;
                return (
                  <Menu.Item
                    key={key}
                    className={styles.menuItem}
                    onClick={() => movePage("/user/documents")}
                  >
                    {submenu}
                  </Menu.Item>
                );
              })
            : localStorage.name !== "관리자"
            ? user_menu.map((submenu, idx) => {
                const key = idx;
                return (
                  <Menu.Item
                    key={key}
                    className={styles.menuItem}
                    onClick={() => movePage(user_url[idx])}
                  >
                    {submenu}
                  </Menu.Item>
                );
              })
            : admin_menu.map((submenu, idx) => {
                const key = idx;
                return (
                  <Menu.Item
                    key={key}
                    className={styles.menuItem}
                    onClick={() => movePage(admin_url[idx])}
                  >
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
