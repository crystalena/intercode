import React, {Component} from 'react';
import './Login.css';

class Login extends Component {
  render() {
    return (
      <div className="login">
          <div className="label">
            <label className="formLabel required" htmlFor="accountName">Account name</label>
          </div>
          <div className="formRow">
            <input aria-required="true"
                   aria-describedby="accountNameInvalid"
                   maxLength="255"
                   className={ this.props.error ? "formInput inputNotValid" : "formInput" }
                   id="accountName"
                   type="text"
                   required/>
          </div>
          { this.props.error &&
          <div className="fieldNotValid"
               id="accountNameInvalid"
               role="alert">Please enter your account name</div> }
        <button className="button"
                onClick={ this.props.onClick }
                onKeyUp={ this.props.onClick }>
          <span className="buttonText">Log in</span>
        </button>
      </div>
    );
  }
}

export default Login;