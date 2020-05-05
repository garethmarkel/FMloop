import React from "react";
import { Redirect } from 'react-router-dom';
import useAppContext from '../../libs/contextLib.js';
//import AppContext from '../../libs/AppContext.js';

const { userHasAuthenticated } = useAppContext();

/*
This class represents the login page.
*/
class LoginComponent extends React.Component {

  /*
  Correct - whether the user successfully logged in.
  Redirect - the url of the dashboard page that the user will be redirected to
    once they login.
  Result - the message of whether the user successfully authenticated or
    not.
  */
  constructor(props) {
    super(props);
    this.state = {
      correct: false,
      email:'',
      passphrase:'',
      result: '',
      redirect: null
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePassphraseChange = this.handlePassphraseChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePassphraseChange(event) {
    this.setState({passphrase: event.target.value});
  }

  /*
  Performs post request to create new user in db.
  */
  handleSubmit(event) {
    event.preventDefault();

    fetch(
      "api/people/authenticate/" + this.state.email.replace('.','..')+'/'+this.state.passphrase
    ).then(result => result.json()
    ).then(
      (result) => {
        var reslt ='Incorrect email and/or password. Please try again.'

        if(result.authenticated === true) {
          reslt = 'Correct password'
        }
        this.setState(() => ({
          correct: result.authenticated,
          result: reslt
        }));
      }
    ).catch((err) => {
      console.log(err);
    });
  }

  /*
  If user successfully authenticated, set redirect to url of dashboard.
  */
  componentDidUpdate() {
    if(this.state.correct) {
      userHasAuthenticated(true);

      this.setState({
        redirect: '/dashboard'
      });
    }
  }

  render()
  {
    /*
    If redirect prop is set, redirect to the prop's value (the url of the
    dashboard).
    */
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    else {
      return (
        <div>
          <div>
            <div>
              <h1>Login</h1>
              <br />
            </div>
            <form onSubmit={this.handleSubmit}>
              <label>Email</label>
              <input type="text" name="email" onChange={this.handleEmailChange} />
              <label>Password</label>
              <input type="passphrase" name="password" onChange={this.handlePassphraseChange} />
              <input type='submit' value='Submit' />
            </form>
          </div>

          /*
          The message that pops up if a user failed to authenticate.
          */
          <h2>{this.state.result}</h2>
        </div>
      );
    }
  }
}

export default LoginComponent;
