/*
Still a work in progress

*/
import React from "react";
import { Redirect } from 'react-router-dom';
import useAppContext from '../../libs/contextLib.js';
//import AppContext from '../../libs/AppContext.js';

const { userHasAuthenticated } = useAppContext();

class LoginComponent extends React.Component {
  //create state and bind setters to state
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


  //handle changes to email field
  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  //handle changes to passphrase field
  handlePassphraseChange(event) {
    this.setState({passphrase: event.target.value});
  }

  //handle submit hook
  handleSubmit(event) {

    //prevent reload
    event.preventDefault();

    //GET authentification status from backend server
    fetch(
      "api/people/authenticate/" + this.state.email.replace('.','..')+'/'+this.state.passphrase
    ).then(result => result.json()
    ).then(
      (result) => {
        //set message to show during testing phase--probably will become warning
        var reslt ='Incorrect email and/or password. Please try again.'

        if(result.authenticated === true) {
          reslt = 'Correct password'
        }
        //use lambda to set state during async
        this.setState(() => ({
          correct: result.authenticated,
          result: reslt
        }));
      }
    ).catch((err) => {
      console.log(err);
    });
  }

  //update hook
  //goal is to set authentification context
  componentDidUpdate() {
    if(this.state.correct) {
      userHasAuthenticated(true);
      console.log(true);
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
    let theme = this.context;
    console.log(theme);

    if (this.state.redirect) {

      return <Redirect to={this.state.redirect} />
    } else {
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
