import React, { Component } from "react";
import Navbar from "./Narbar";
import "./../css/Home.css";

class AboutUs extends Component {
  render() {
    return (
      <div>
        <Navbar login="false" />
        <div className="left">
          <p className="fs-2">Welcome to the management dashboard</p>
          <p className="fs-6">
            Please use the test account to login the website. <br></br>Theis
            website is created t odemomnstrate Leung Tsz Kin's prototype only.{" "}
            <br></br>If you encounter any problem, <br></br>please contact me
            via tkleung68-c@my.cityu.edu.hk
          </p>
          <p>
            account: fyp2021@gmail.com<br></br>
            password: getAplus
          </p>
        </div>
      </div>
    );
  }
}

export default AboutUs;
