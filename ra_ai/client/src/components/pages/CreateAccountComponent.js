import React from "react";
import { Redirect } from 'react-router-dom';

/*
This is the web page where users will get to create their account.
*/
class CreateAccountComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correct: false,
      first_name: '',
      last_name: '',
      email:'',
      passphrase:'',
      confirm_passphrase: '',
      result: '',
      redirect: null
    };

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePassphraseChange = this.handlePassphraseChange.bind(this);
    this.handleConfirmPassphraseChange = this.handleConfirmPassphraseChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }


  handleFirstNameChange(event) {
    this.setState({first_name: event.target.value});
  }

  handleLastNameChange(event) {
    this.setState({last_name: event.target.value});
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePassphraseChange(event) {
    this.setState({passphrase: event.target.value});
  }

  handleConfirmPassphraseChange(event) {
    this.setState({confirm_passphrase: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.passphrase === this.state.confirm_passphrase) {
      //console.log(data);
      fetch("api/people/create/", {
        method: 'post',
        body: JSON.stringify({
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          email: this.state.email,
          passphrase: this.state.passphrase
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(data => {
        if(data.status === 200) {
          this.setState(() => ({
            correct: true
          }));
        }
        else if(data.status === 422) {
          this.setState(() => ({
            result: 'User already exists. Please use a new email.'
          }));
        }
        else {
          ///need to make sure we can send 422 error properly
          console.log('New error?' + data.status);
        }
      }).catch((err) => {
        ///We're going to want to log to some sort of logging tool here, splunk?
        console.log('New error with server itself? ' + err);
      });
    }
    else {
      this.setState({
        result: "Password and Password Confirmation do not match."
      });
    }
  }

  componentDidUpdate() {
    if(this.state.correct){
      this.setState({
        redirect: '/login'
      });
    }
  }

  render()
  {
    if (this.state.redirect){
      return <Redirect to={this.state.redirect} />
    }
    else {
      return (
        <div>
          <div>
            <div>
              <h1>Create Account</h1>
              <br />
            </div>
            <form onSubmit={this.handleSubmit}>
              <label>Email</label>
              <input type="text" name="email" onChange={this.handleEmailChange} />
              <br />
              <label>First Name</label>
              <input type="text" name="first_name" onChange={this.handleFirstNameChange} />
              <br />
              <label>Last Name</label>
              <input type="text" name="last_name" onChange={this.handleLastNameChange} />
              <br />
              <label>Password</label>
              <input type="passphrase" name="password" onChange={this.handlePassphraseChange} />
              <br />
              <label>Confirm Password</label>
              <input type="passphrase" name="confirm_password" onChange={this.handleConfirmPassphraseChange} />
              <br />
              <br />
              <input type='submit' value='Submit' />
            </form>
          </div>

          <h1>{this.state.result}</h1>
        </div>
      );
    }
  }
}

export default CreateAccountComponent;
