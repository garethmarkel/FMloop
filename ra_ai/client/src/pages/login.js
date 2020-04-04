import React, { Component } from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      correct: false,
      email:'',
      passphrase:''
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePassphraseChange = this.handlePassphraseChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePassphraseChange(event) {
    this.setState({passphrase: event.target.value});
  }

  handleSubmit(event) {
    //console.log(JSON.stringify({name: this.state.value}));
    console.log("hi");
    fetch("/people/authenticate", {
      method: 'POST',
      body: JSON.stringify({
        passphrase: this.state.passphrase,
        email: this.state.email
      })
    }).then(
      (result) => {
        //console.log('AAA');
        console.log(result.authenticated);
        this.setState({
          correct: result.authenticated,
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      (error) => {
        console.log(error);
        this.setState({
          correct: false,
          error: error
        });
      }
    ).catch((err) => {
      console.log(err);
    });
    //alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render()
  {
    const { error } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>Email</label>
            <input type="text" name="email" onChange={this.handleEmailChange} />
            <label>Password</label>
            <input type="passphrase" name="password" onChange={this.handlePassphraseChange} />
            <input type='submit' value='Submit' />
          </form>
        </div>
      );
    }
  }
}

export default Login;
