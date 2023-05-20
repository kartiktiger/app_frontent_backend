import React, { Component } from "react";
import LoginSuccessComponent from "./LoginSuccessComponent";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginComponent from "./LoginComponent";
import LogoutComponent from "./LogoutComponent";
import MenuComponent from "./MenuComponent";
// eslint-disable-next-line
import AuthenticationService from "../service/AuthenticationService";
import AuthenticatedRoute from "./AuthenticatedRoute";

class LoginApp extends Component {
  render() {
    return (
      <Router>
        <MenuComponent />
        <Switch>
          <Route path="/" exact component={LoginComponent} />
          <Route path="/login" exact component={LoginComponent} />
          <Route path="/logout" exact component={LogoutComponent} />
          <AuthenticatedRoute
            path="/success"
            exact
            component={LoginSuccessComponent}
          />
        </Switch>
      </Router>
    );
  }
}

export default LoginApp;
