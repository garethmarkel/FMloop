import React from "react";
import { Redirect } from 'react-router-dom';

// const createAccount = async(args) => {
//   fetch("api/people/create/", {
//     method: 'post',
//     body: JSON.stringify({
//       first_name: args.first_name,
//       last_name: args.last_name,
//       email: args.email,
//       passphrase: args.passphrase
//     }),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   }).then((result) => {
//     console.log(result.status);
//     console.log('STATUS TEXT ' + result.statusText);
//     // console.log(result.json().beans)
//     console.log('AAAA');
//     console.log(result);
//     var reslt = "";
//
//     if(result.status === 422) {
//       reslt = 'Email is already in use you fucking clown';
//       var data = {
//         redirect: null,
//         result: reslt,
//         correct: false
//       }
//       return data;
//     }
//     else if (result.status === 200) {
//       reslt = "You straight homie.";
//
//       var data = {
//         redirect: '/login',
//         result: reslt,
//         correct: false
//       }
//       return data;
//
//       // this.history.push("/login");
//     }
//     else {
//       reslt = 'Michael Vick did the right thing';
//       console.log(reslt);
//       var data = {
//         redirect: null,
//         result: reslt,
//         correct: false
//       }
//       return data;
//     }
//   }).catch((err) =>
//   {
//     console.log('B E A N');
//     console.log(err);
//   });
// }

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

    // this.history = useHistory();
  }

  postAccount(args) {
    fetch("api/people/create/", {
     method: 'post',
     body: JSON.stringify({
       first_name: args.first_name,
       last_name: args.last_name,
       email: args.email,
       passphrase: args.passphrase
     }),
     headers: {
       'Content-Type': 'application/json'
     }
   }).then((response) => {
     var resp = response;
     return resp;
   }).then((resp) => {
     return resp;
   });
  }

  desperation(args) {
    var data = this.createAccount(args);
    return data;
  }

  async createAccount(args) {
    let prom = await this.postAccount(args );

    var reslt = '';

    console.log('PROM: ' + prom);
    console.log(prom.status);
    var data = null;

    if(prom.status === 200) {
      reslt = "You straight homie.";

      data = {
        redirect: '/login',
        result: reslt,
        correct: false
      }

      return data;
    }
    else if (prom.status === 422) {
      reslt = 'Email is already in use you fucking clown';
      data = {
        redirect: null,
        result: reslt,
        correct: false
      }
      return data;
    }

    throw new Error('Drink bleach cock');
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
        console.log('RESPONSE');

        if(data.status === 200) {
          this.setState(() => ({
            correct: true
          }));
          console.log('correct');
        }
        else {
          console.log(data.status);
          console.log('If the glove dont fit...');
        }
      }).catch((err) => {
        console.log('Sad boi error' + err);
      });


      // console.log(sad);
      // console.log(sad.status);
      // console.log('ZOO WEE MAMA');
      // console.log('var' + this.state.correct);
      // //
      // if(this.state.correct){
      // this.setState({
      //   redirect: '/login'
      // });
      // }


      //.then((result) => {
      //   console.log(result.status);
      //   console.log('STATUS TEXT ' + result.statusText);
      //   // console.log(result.json().beans)
      //   console.log('AAAA');
      //   console.log(result);
      //   var reslt = "";
      //
      //   if(result.status === 422) {
      //     reslt = 'Email is already in use you fucking clown';
      //     this.setState((reslt) => ({
      //       result: reslt
      //     }));
      //   }
      //   else if (result.status === 200) {
      //     reslt = "You straight homie.";
      //
      //     this.setState((reslt) => ({
      //       correct: true,
      //       result: reslt,
      //       redirect: '/login'
      //     }));
      //
      //     // this.history.push("/login");
      //   }
      //   else {
      //     reslt = 'Michael Vick did the right thing';
      //     console.log(reslt);
      //     this.setState((reslt) => ({
      //       result: reslt
      //     }));
      //   }
      // }).catch((err) =>
      // {
      //   console.log('B E A N');
      //   console.log(err);
      // });
      // var data = this.desperation(this.state);
      //
      // console.log('DATA:' + data);
      //
      // this.setState({
      //   correct: data.correct,
      //   redirect: data.redirect,
      //   result: data.result
      // });
    }
    else {
      this.setState({
        result: "Password and Password Confirmation do not match\n\n\n\n\t\t you fucking simp."
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
    const error = this.state.error;

    if (error) {
      return <div>Error: {error.message}</div>;
    }
    else if (this.state.redirect){
      console.log('cock and ball');
      // debugger;
      return <Redirect to={this.state.redirect} />
    }
    else {
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
