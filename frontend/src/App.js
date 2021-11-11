import "@/App.less";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "@navbar/NavBar";
import MainPage from "@mainpage/MainPage";
import Login from "@login/Login";
import Register from "@register/Register";
import Documents from "@documents/Documents";
import RequestPage from "@requestpage/RequestPage";
import ResultList from "@resultlist/ResultList";
import ResultPage from "@/components/views/ResultPage/ResultPage";
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
          <Route exact path="/" component={MainPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/documents" component={Documents} />
          <Route exact path="/request" component={RequestPage} />
          <Route exact path="/result" component={ResultList} />
          <Route exact path="/result/:postID" component={ResultPage} />
        </Switch>
      </div>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
