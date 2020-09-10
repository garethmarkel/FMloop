import React from "react";
import { Redirect } from 'react-router-dom';
import AppContext from '../../libs/AppContext.js';
import {Helmet} from 'react-helmet';

/*
check if freelancer
check for zip code
if freelancer rediirect to questionaire
  else redirect to login

look at threadcomponent and projectcomponent to put skills questionaire in
each itme in map has 2 boxes with dropdown and skills
need route to input skills

need to store values from skills sliders somewhere
*/


/*
This is the web page where users will get to create their account.
*/
class CreateAccountComponent extends React.Component {
  static contextType = AppContext;

  //construct instance, bind state to setters and hooks
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
      zip: '',
      is_freelancer: false,
      python_skill: 0,
      javaScript_skill: 0,
      node_skill: 0,
      redirect: null
    };

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePassphraseChange = this.handlePassphraseChange.bind(this);
    this.handleConfirmPassphraseChange = this.handleConfirmPassphraseChange.bind(this);
    this.handleZipCodeChange = this.handleZipCodeChange.bind(this);
    this.handleIsFreelancerChange = this.handleIsFreelancerChange.bind(this);
    this.handlePythonSliderChange = this.handlePythonSliderChange.bind(this);
    this.handleJavaScriptSliderChange = this.handleJavaScriptSliderChange.bind(this);
    this.handleNodeSliderChange = this.handleNodeSliderChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  // handle zip code field
  handleZipCodeChange(event) {
    this.setState({zip: event.target.value});
  }

  // if the box is ticked we update our freelancer value, target.checked should be a bool I hope
  handleIsFreelancerChange(event) {
      this.setState({is_freelancer: target.checked});
  }

  // handle python slider
  handlePythonSliderChange(event) {
    this.setState({python_skill: event.target.value});
  }

  // handle js slider for skills questionaire
  handleJavaScriptSliderChange(event) {
    this.setState({javaScript_skill: event.target.value});
  }

  // handle node slider for skills questionaire
  handleNodeSliderChange(event) {
    this.setState({node_skill: event.target.value});
  }

  // display the freelancer questionaire
  displayQuestionaire() {
    if(this.state.is_freelancer) {
      return (
        <form>
          <label>Rate your skill with Python</label>
          <input
            id="typeinp"
            type="range"
            min="0" max="10"
            value={this.state.python_skill}
            onChange={this.handlePythonSliderChange}
            step="1"/>
          />
          <br />
          <label>Rate your skill with JavaScript</label>
          <input
            id="typeinp"
            type="range"
            min="0" max="10"
            value={this.state.javaScript_skill}
            onChange={this.handleJavaScriptSliderChange}
            step="1"/>
          />
          <br />
          <label>Rate your skill with Node.js</label>
          <input
            id="typeinp"
            type="range"
            min="0" max="10"
            value={this.state.node_skill}
            onChange={this.handleNodeSliderChange}
            step="1"/>
          <br />
        </form>);
    }

    return <br />;
  }


  //handle submit button
  handleSubmit(event) {
    //prevent page from undoing redirect
    event.preventDefault();

    //double check to make sure user validated password
    if (this.state.passphrase === this.state.confirm_passphrase) {
      //post results to server to be written to database
      console.log(this.state);
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
        //check for sucess
        //enable redirect in componentDidUpdate
        if(data.status === 200) {
          this.setState(() => ({
            correct: true
          }));
        }
        //if status is 422, user already exists
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
        redirect: '/login'
      });
    }
  }

  componentDidMount() {
    if(this.context.getAuth()) {
      this.setState({
        redirect: '/dashboard'
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
          <Helmet>
            <title>Create Account</title>
          </Helmet>
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
              <label>Are You a Freelancer?</label>
              <input type="checkbox" name="is_freelancer" onChange={this.handleIsFreelancerChange} />
              <br />
              { this.displayQuestionaire() }
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
