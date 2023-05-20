import React, { Component } from 'react';
import './App.css';
import LoginApp from './component/LoginApp.jsx';

class App extends Component {
  render() {
    return (
      <div className="container">
        <LoginApp />
      </div>
    );
  }
}

export default App;