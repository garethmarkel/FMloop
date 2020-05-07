/*
This file defines our app render function
pretty muche xclusively acts as a router
*/


import React, { useState } from 'react';
import './css/App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AppContext from './libs/AppContext';

import HomeComponent from './components/pages/HomeComponent';
import LoginComponent from './components/pages/LoginComponent';
import CreateAccountComponent from './components/pages/CreateAccountComponent';
import DashboardComponent from './components/pages/DashboardComponent';
import EditAccountComponent from './components/pages/EditAccountComponent';
// class DebugRouter extends BrowserRouter {
//   constructor(props){
//     super(props);
//     console.log('initial history is: ', JSON.stringify(this.history, null,2))
//     this.history.listen((location, action)=>{
//       console.log(
//         `The current URL is ${location.pathname}${location.search}${location.hash}`
//       )
//       console.log(`The last navigation action was ${action}`, JSON.stringify(this.history, null,2));
//     });
//   }
// }

class App extends React.Component {
  //authentification context. doesn;t work yet.

  //classic constructor method
  //i think this only exists to persist the context as part of state in a way that we can bidn setAuth to,
  //but i'm not sure. works tho
  constructor(props){
    super(props);
    this.state = {
      person: null,
      setAuth: this.setAuth.bind(this)
    };
  }

  //class method to update person components
  //you'll notice it looks like a normal react method call
  setAuth(person) {
    this.setState({person});
  };

  //in react speak, render function
  //returns routes which we call in redirects
  // .Provider passes context down, where it can be consumed by .Consumers or merely this.COntext
  render () {
    return (
      <div className="App">
        <AppContext.Provider value={this.state}>
          <BrowserRouter>
            <div>
              <Switch>
                <Route exact path="/" component={HomeComponent} />
                <Route path="/login" component={LoginComponent} />
                <Route path="/dashboard" component={DashboardComponent} />
                <Route path="/create-account" component={CreateAccountComponent} />
                <Route path="/edit-account" component={EditAccountComponent} />
                <Redirect from="*" to="/" />
              </Switch>
            </div>
          </BrowserRouter>
        </AppContext.Provider>
      </div>
    );
  }
}

export default App;
//<Route path="/edit-account" component={EditAccountComponent} />
