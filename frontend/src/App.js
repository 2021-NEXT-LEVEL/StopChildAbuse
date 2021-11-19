import "@/App.less";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "@navbar/NavBar";
import UserMainPage from "@userMain/UserMainPage";
import Login from "@login/Login";
import Register from "@register/Register";
import Documents from "@documents/Documents";
import RequestPage from "@requestpage/RequestPage";
import ResultList from "@resultlist/ResultList";
import ResultPage from "@result/ResultPage";
import AdminMainPage from "@adminMain/AdminMainPage";
import CheckRequestList from "@checkRequestList/CheckRequestList";
import CheckRequest from "@checkRequest/CheckRequest";
import CheckResult from "@checkResult/CheckResult";
import Footer from "@footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div
        style={{
          padding: "80px 50px 0px 0px",
          minHeight: "1000px",
        }}
      >
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/user/main" component={UserMainPage} />
          <Route exact path="/user/documents" component={Documents} />
          <Route exact path="/user/request" component={RequestPage} />
          <Route exact path="/user/result" component={ResultList} />
          <Route exact path="/user/result/:postID" component={ResultPage} />
          <Route exact path="/master/main" component={AdminMainPage} />
          <Route
            exact
            path="/master/checkRequest"
            component={CheckRequestList}
          />
          <Route
            exact
            path="/master/checkRequest/:postID"
            component={CheckRequest}
          />
          <Route exact path="/master/checkResult" component={CheckResult} />
        </Switch>
      </div>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
