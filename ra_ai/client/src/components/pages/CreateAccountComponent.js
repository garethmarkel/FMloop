import React from "react";
import { Redirect } from 'react-router-dom';

class CreateAccountComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      correct: false,
      first_name: '',
      last_name: '',
      email:'',
      passphrase:'',
      confirm_passphrase: '',
      result: ''
    };

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePassphraseChange = this.handlePassphraseChange.bind(this);
    this.handleConfirmPassphraseChange = this.handleConfirmPassphraseChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then((result) => {
        console.log('see if it fails here');
        console.log(result.status);
        console.log(result.statusText);
        console.log('AAAA');
        console.log(result);
        var reslt = "";

        if(result.status === 422) {
          reslt = 'Email is already in use you fucking clown';

          event.preventDefault();
        }
        else if (result.status === 200) {
          reslt = "You straight homie.";

          this.setState({
            correct: true
          });
        }
        else {
          reslt = 'Michael Vick did the right thing';
          console.log(reslt);
          event.preventDefault();
        }

        this.setState({
          result: reslt
        });

        console.log('BBBB');
      }).catch((err) =>
      {
        console.log('B E A N');
        console.log(err);

        event.preventDefault();
      });
    } else {
      this.setState({
        result: "Password and Password Confirmation do not match\n\n\n\n\t\t you fucking simp."
      });

      event.preventDefault();
    }
  }

  render()
  {
    const error = this.state.error;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (this.state.correct === true){
      console.log('cock and ball');
      return(<Redirect to = '/login' />)
    } else {
      return (
        <div>
          <div>
            <div>
              <h1>CREATE ACCOUNT BIATCH</h1>
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
