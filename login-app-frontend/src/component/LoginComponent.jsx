import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthenticationService from "../service/AuthenticationService";

class LoginComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      hasLoginFailed: false,
      showSuccessMessage: false,
      isPwdHidden: true,
      rememberMeCheck: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.loginClicked = this.loginClicked.bind(this);
    this.pwdRef = React.createRef();
    this.rememberRef = React.createRef();
    this.eyeRef = React.createRef();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  setLocalStorage = (email, password) => {
    localStorage.email = email;
    localStorage.password = password;
  };

  checkAndCacheLoginDetails = () => {
    const { email, password, rememberMeCheck } = this.state;
    if (rememberMeCheck) {
      if (email !== "") {
        this.setLocalStorage(email, password);
      }
    } else {
      this.setLocalStorage("", "");
    }
  };

  loginClicked() {
    this.checkAndCacheLoginDetails();
    AuthenticationService.executeAuthenticationService(
      this.state.email,
      this.state.password
    )
      .then((response) => {
        AuthenticationService.registerSuccessfulLogin(
          this.state.email,
          response.data.token
        );
        this.props.history.push(`/success`);
      })
      .catch(() => {
        this.setState({ showSuccessMessage: false });
        this.setState({ hasLoginFailed: true });
      });
  }

  togglePassword = () => {
    if (this.pwdRef.current.type === "password") {
      this.pwdRef.current.type = "text";
      this.setState({ isPwdHidden: false });
    } else {
      this.pwdRef.current.type = "password";
      this.setState({ isPwdHidden: true });
    }
  };

  rememberMe = () => {
    this.setState(
      (prevState) => {
        return { ...prevState, rememberMeCheck: !prevState.rememberMeCheck };
      },
      () => {
        if (this.state.rememberMeCheck) {
          this.rememberRef.current.style.color = "green";
        } else {
          this.rememberRef.current.style.color = "black";
        }
      }
    );
  };

  componentDidMount() {
    if (localStorage.email !== "") {
      this.setState({
        email: localStorage.email,
        password: localStorage.password,
      });
    }
  }

  render() {
    const { isPwdHidden, rememberMeCheck } = this.state;
    return (
      <div>
        <div className="container align-items-center">
          <div className="form-row">
            <div className="col-md-4">&nbsp;</div>
            <div className="form-group col-md-4">
              <label for="email">Email address</label>
              <input
                type="text"
                name="email"
                placeholder="Email : eg - kartik.agwl@gmail.com"
                className="form-control mb-6"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>{" "}
          </div>

          <div className="form-row">
            <div className="col-md-4">&nbsp;</div>
            <div className="form-group col-md-4">
              <label for="passwd\">Password</label>
              <input
                ref={this.pwdRef}
                type="password"
                id="passwd"
                name="password"
                placeholder="Password : eg - test"
                className="form-control"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <i
                ref={this.eyeRef}
                toggle="#passwd"
                onClick={this.togglePassword}
                className={`align-self-center input-group-addon fa fa-lg fa-fw field-icon toggle-password 
                                 ${isPwdHidden ? "fa-eye-slash" : " fa-eye"}`}
                style={{
                  float: "right",
                  cursor: "pointer",
                  position: "relative",
                  top: "-25px",
                  "z-index": "1",
                }}
              ></i>
            </div>{" "}
          </div>

          {this.state.hasLoginFailed && (
            <div className="form-row">
              <div className="col-md-4">&nbsp;</div>
              <div className="form-group col-md-8">
                <div className="text-danger">
                  Incorrect Login, Please check your email and password.
                </div>
              </div>
            </div>
          )}

          <div className="form-row">
            <div className="col-md-4">&nbsp;</div>
            <div
              ref={this.rememberRef}
              toggle="#rememberme"
              onClick={this.rememberMe}
              style={{ cursor: "pointer", "margin-right": "10px" }}
              className={`fa fa-2x fa-toggle-on ${
                rememberMeCheck ? "text-success" : "text-dark"
              }`}
            ></div>
            <div className="align-self-center">Remember me</div>
            <Link
              className="align-self-center text-right nav-link text-dark"
              style={{
                float: "right",
                position: "relative",
                left: "70px",
                "z-index": "1",
              }}
            >
              Forgot password?{" "}
            </Link>
          </div>

          <div className="form-row">
            <div className="col-md-5">&nbsp;</div>
            <button
              className="btn btn-dark col-md-2"
              onClick={this.loginClicked}
            >
              SIGN IN
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginComponent;
