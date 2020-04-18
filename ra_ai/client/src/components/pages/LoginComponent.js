import React from "react";

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      correct: false,
      email:'',
      passphrase:'',
      result: ''
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
    fetch(
      "api/people/authenticate/" + this.state.email.replace('.','..')+'/'+this.state.passphrase
    ).then(result => result.json()).then(
      (result) => {
        var reslt ='Wrong password, motherfucker'
        if(result.authenticated === true) {
          reslt = 'Correct password, simp'
        }
        this.setState({
          correct: result.authenticated,
          result: reslt
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
          <div>
            <div>
              <h1>IN NEW YORK I MILLY ROCK</h1>
              <h2>TORTURE BALL AND COCK</h2>
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

          <h1>{this.state.result}</h1>
        </div>
      );
    }
  }
}

export default LoginComponent;
