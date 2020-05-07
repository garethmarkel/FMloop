import React from "react";
import { Redirect } from 'react-router-dom';
import AppContext from '../../libs/AppContext.js';

/*
This class represents the login page.
*/
class LoginComponent extends React.Component {
  static contextType = AppContext;

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

  changeAuth(person){
    //i want t do some logi specific to this class component then change the context value
    this.context.setAuth(person);
  }

  //handle changes to email field
  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  //handle changes to passphrase field
  handlePassphraseChange(event) {
    this.setState({passphrase: event.target.value});
  }

  /*
  Performs post request to create new user in db.
  */
  handleSubmit(event) {
    //prevent reload
    event.preventDefault();

    //GET authentification status from backend server
    fetch(
      "api/people/authenticate/" + this.state.email.replace('.','..')+'/'+this.state.passphrase
    ).then(
      data => data.json()
    ).then(
      (data) => {
        //set message to show during testing phase--probably will become warning
        var response ='Incorrect email and/or password. Please try again.';

        if(data.authenticated === true) {
          response = 'Correct password';
          
          this.changeAuth(data.person);
          // console.log(result.person);
        }
        //use lambda to set state during async
        this.setState(() => ({
          correct: data.authenticated,
          result: response
        }));
      }
    ).catch((err) => {
      console.log(err);
    });
  }

  /*
  If user successfully authenticated, set redirect to url of dashboard.
  Goal is to set user info as context.
  */
  componentDidUpdate() {
    if(this.state.correct) {
      this.setState({
        redirect: '/dashboard'
      });
    }
  }
  //render function
  //returns redirect if state redirect is not null,
  //else returns login form
  render()
  {
    /*
    If redirect prop is set, redirect to the prop's value (the url of the
    dashboard).
    */
    if (this.state.redirect) {
      // console.log(this.context.person);
      return (
        <Redirect to={this.state.redirect} />
      );
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

          <h2>{this.state.result}</h2>
        </div>
      );
    }
  }
}

export default LoginComponent;
