import React, { Component } from 'react';
import logo from './logo.svg';
import Login from './components/login/Login';
import Checkout from './components/checkout/Checkout';
import './App.css';

class App extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      invalid: false,
      accName: ''
    };
  }

  onClick() {
    let input = document.getElementById("accountName");
    if (input.value === '') {
      this.setState({ invalid: true });
    } else {
      this.setState({ accName: input.value });
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to New AdCentre</h2>
        </div>
        {
          this.state.accName === '' ?
            <Login onClick={ this.onClick.bind(this) } error={ this.state.invalid } /> :
            <Checkout accName={ this.state.accName } />
        }
      </div>
    );
  }
}

export default App;
