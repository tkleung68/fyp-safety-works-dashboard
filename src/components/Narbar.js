import React, { Component } from "react";
import "../css/Narbar.css";
import Cookies from "js-cookie";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };
    this.logout = this.logout.bind(this);
    // this.showLoginScreen = this.showLoginScreen.bind(this);
  }
  logout() {
    console.log(this.props.login);
    // TO-DO auth logout
    Cookies.set("login_status", false);
    window.location.reload();
  }

  render() {
    let showButton;
    if (this.props.login === "true") {
      showButton = true;
    } else {
      showButton = false;
    }
    return (
      <div>
        <ul>
          <span>Satety Dashboard</span>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/worker">Worker</a>
          </li>
          <li>
            <a href="/project">Project Setting</a>
          </li>
          <li>
            <a href="/aboutus">About us</a>
          </li>
          {showButton ? (
            <li className="on_the_right">
              <button type="button" onClick={this.logout}>
                Logout
              </button>
            </li>
          ) : (
            <div></div>
          )}
        </ul>
      </div>
    );
  }
}

export default Navbar;
