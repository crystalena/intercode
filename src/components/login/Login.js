import React, {Component} from 'react';
import './Login.css';

class Login extends Component {
  render() {
    return (
      <div className="login">
          <div className="label">
            <label className="formLabel required" htmlFor="accountName">Account name</label>
            <span className="required">required</span>
          </div>
          <div className="formRow">
            <input aria-required="true"
                   aria-describedby="accountNameInvalid"
                   maxLength="255"
                   className="formInput"
                   id="accountName"
                   type="text"
                   required/>
            { !this.props.error && <div className="inputValid"></div> }
          </div>
          {this.props.touched && this.props.error &&
          <div className="fieldNotValid"
               id="accountNameInvalid"
               role="alert">{this.props.error}</div>}
      </div>
    );
  }
}

export default Login;