/*
This file defines our app render function
pretty muche xclusively acts as a router
*/


import React from 'react';
import './css/App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AppContext from './libs/AppContext';

import HomeComponent from './components/pages/HomeComponent';
import LoginComponent from './components/pages/LoginComponent';
import CreateAccountComponent from './components/pages/CreateAccountComponent';
import DashboardComponent from './components/pages/DashboardComponent';
//import EditAccountComponent from './components/pages/EditAccountComponent';
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


  constructor(props){
    super(props);
    this.state = {
      //person: localstorage.getItem('person'),

      setAuth: this.setAuth.bind(this)
    };
  }

  setAuth(person) {
    //localstorage.setItem('person', person);
    this.setState({person});
  }

  //in react speak, render function
  //returns routes which we call in redirects
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
