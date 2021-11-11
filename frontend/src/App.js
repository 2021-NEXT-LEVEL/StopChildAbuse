import "@/App.less";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "@navbar/NavBar";
import MainPage from "./components/views/MainPage/MainPage";
import Login from "@login/Login";
import Register from "@register/Register";
import RequestPage from "@/components/views/RequestPage/RequestPage";
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
          <Route exact path="/request" component={RequestPage} />
        </Switch>
      </div>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
