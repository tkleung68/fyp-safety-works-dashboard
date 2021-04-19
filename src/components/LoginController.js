import React, { Component } from "react";
import "../css/LoginController.css";
import Cookies from "js-cookie";
import { firebase } from "./firebase_config";

class LoginController extends Component {
  constructor() {
    super();
    let formValues = { user: "", password: "" };
    this.state = { formValues, login: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let formValues = this.state.formValues;
    let key = event.target.name;
    formValues[key] = event.target.value;
    this.setState({ formValues: formValues });
  }

  async handleSubmit(event) {
    console.log(this.state.formValues);
    event.preventDefault();
    // if (
    //   this.state.formValues["user"] === "fyp2021" &&
    //   this.state.formValues["password"] === "getAplus"
    // ) {
    // this.setState({ login: true });
    // }
    var result = false;
    var user = this.state.formValues["user"];
    var password = this.state.formValues["password"];
    firebase
      .auth()
      .signInWithEmailAndPassword(user, password)
      .then(function (result) {
        alert("Successfully signed in!");
        result = true;
        Cookies.set("login_status", result);
        Cookies.set("current_user", user);
        window.location.reload();
      })
      .catch(function (error) {
        alert("Failed! " + error);
        Cookies.set("login_status", result);
        Cookies.set("current_user", user);
        window.location.reload();
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Sign in</h2>
        <label className="form-controls">
          Email:<br></br>
          <input
            className="input-controls"
            value={this.state.formValues["email"]}
            onChange={this.handleChange}
            placeholder="Enter eamil ..."
            name="user"
            type="text"
          />
        </label>

        <label className="form-controls">
          Password:<br></br>
          <input
            className="input-controls"
            value={this.state.formValues["password"]}
            onChange={this.handleChange}
            placeholder="Enter password ..."
            name="password"
            type="password"
          />
        </label>
        <br></br>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default LoginController;
