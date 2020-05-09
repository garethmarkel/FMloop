import React from "react";
import { Redirect } from 'react-router-dom';
import AppContext from '../../libs/AppContext.js';

/*
This is the web page where users will get to create their account.
*/
class EditAccountComponent extends React.Component {
  //establish link with context
  static contextType = AppContext;
  changeAuth(person){
    this.context.setAuth(person);
  }
  //construct instance, bind state to setters and hooks
  constructor(props) {
    super(props);
    this.state = {
      correct: false,
      id: null,
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
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  //handle first_name field
  handleFirstNameChange(event) {
    this.setState({first_name: event.target.value});
  }
  //handle last_name field
  handleLastNameChange(event) {
    this.setState({last_name: event.target.value});
  }
  //handle email field
  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }
  //handle passphrase field
  handlePassphraseChange(event) {
    this.setState({passphrase: event.target.value});
  }
  //handle passphrase confirmation field
  handleConfirmPassphraseChange(event) {
    this.setState({confirm_passphrase: event.target.value});
  }
  //handle submit button
  handleSubmit(event) {
    //prevent page from undoing redirect
    event.preventDefault();

    //double check to make sure user validated password
    if (this.state.passphrase === this.state.confirm_passphrase) {
      //post results to server to be written to database
      fetch("api/people/update/", {
        method: 'post',
        body: JSON.stringify({
          id: this.state.id,
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          email: this.state.email,
          passphrase: this.state.passphrase
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(data => data.json()).then(data => {
        //check for sucess
        //overwrite auth
        //enable redirect in componentDidUpdate
        if(data.person) {
          this.changeAuth(data.person);
          this.setState(() => ({
            correct: true
          }));
        }
      }).catch((err) => {
        ///We're going to want to log to some sort of logging tool here, splunk?
        console.log('New error with server itself? ' + err);
      });
    }
    else {
      //set message for unvalidated password
      this.setState({
        result: "Password and Password Confirmation do not match."
      });
    }
  }
  //if post successful, set redirect value here
  //called whenever update is clicked
  componentDidUpdate() {
    if(this.state.correct){
      this.setState({
        redirect: '/dashboard'
      });
    }
  }
  //set state or redirect whenever component mounts (catch unauth)
  componentDidMount() {
    if(!this.context.person){
      this.setState({
        redirect: '/login'
      });
    } else {
      this.setState({
        id: this.context.person.id,
        first_name: this.context.person.first_name,
        last_name: this.context.person.last_name,
        email: this.context.person.email,
        passphrase: this.context.person.passphrase,
        confirm_passphrase: this.context.person.passphrase,
      });
    }

  }

  //render function
  //if redirect is not null, renders Redirect
  //else, renders form
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
              <input type="text" value={this.state.email} name="email" onChange={this.handleEmailChange} />
              <br />
              <label>First Name</label>
              <input type="text" value={this.state.first_name} name="first_name" onChange={this.handleFirstNameChange} />
              <br />
              <label>Last Name</label>
              <input type="text" value={this.state.last_name} name="last_name" onChange={this.handleLastNameChange} />
              <br />
              <label>Password</label>
              <input type="passphrase" value={this.state.passphrase} name="password" onChange={this.handlePassphraseChange} />
              <br />
              <label>Confirm Password</label>
              <input type="passphrase" value={this.state.confirm_passphrase} name="confirm_password" onChange={this.handleConfirmPassphraseChange} />
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

export default EditAccountComponent;