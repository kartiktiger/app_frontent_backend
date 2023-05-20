import React, { Component } from "react";
import { Link } from "react-router-dom";
import LoginComponent from "./LoginComponent";

class LogoutComponent extends Component {
  render() {
    return (
      <div className="container">
        <div className="text-center">
          <h2>
            <Link className="nav-link text-dark" to="/login">
              Login
            </Link>
          </h2>
        </div>
      </div>
    );
  }
}

export default LogoutComponent;
