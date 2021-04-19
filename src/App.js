import "./App.css";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import Home from "./components/Home";
import Worker from "./components/Worker";
import Project from "./components/Project";
import AboutUs from "./components/AboutUs";

function App() {
  // console.log("Current " + Cookies.get("login_status"));
  var login_status = false;
  if (Cookies.get("login_status") === "true") {
    login_status = true;
  }
  return (
    <div>
      <BrowserRouter>
        <Route exact path="/">
          {login_status ? <Redirect to="/worker" /> : <Home />}
        </Route>
        <Route exact path="/worker">
          {login_status ? <Worker /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/project">
          {login_status ? <Project /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/aboutus">
          <AboutUs />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
