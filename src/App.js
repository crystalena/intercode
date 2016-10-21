import React, { Component } from 'react';
import logo from './logo.svg';
import Login from './components/login/Login';
import Checkout from './components/checkout/Checkout';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
          <Login />
          <Checkout />
      </div>
    );
  }
}

export default App;
