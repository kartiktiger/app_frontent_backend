import React, { Component } from "react";

const INSTRUCTOR = "in28minutes";

class LoginSuccessComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null
    };
  }

  render() {
    console.log("render");
    return (
      <div className="container">
        <div className="text-center">
          <h3>Login Success</h3>
          <div className="container">
            Congrats. You are logged in Successfully...!!!
          </div>
        </div>
      </div>
    );
  }
}

export default LoginSuccessComponent;
