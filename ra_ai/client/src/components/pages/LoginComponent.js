import React from "react";
import { Redirect } from 'react-router-dom';
import useAppContext from '../../libs/contextLib.js';
//import AppContext from '../../libs/AppContext.js';

const { userHasAuthenticated } = useAppContext();

class LoginComponent extends React.Component {

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

  componentDidUpdate() {
    if(this.state.correct) {
      userHasAuthenticated(true);
      console.log(true);
      this.setState({
        redirect: '/dashboard'
      });
    }
  }

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
