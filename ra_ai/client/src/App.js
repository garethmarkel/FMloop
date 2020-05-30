/*
This file defines our app render function
pretty muche xclusively acts as a router
*/

import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './css/App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AppContext from './libs/AppContext';
import {Helmet} from 'react-helmet';
import HomeComponent from './components/pages/HomeComponent';
import LoginComponent from './components/pages/LoginComponent';
import CreateAccountComponent from './components/pages/CreateAccountComponent';
import DashboardComponent from './components/pages/DashboardComponent';
import EditAccountComponent from './components/pages/EditAccountComponent';
import CreateProjectComponent from './components/pages/CreateProjectComponent';
import ProjectComponent from './components/pages/ProjectComponent';
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
      // person: localStorage.getItem('person').json(),
      getAuth: this.getAuth.bind(this),
      setAuth: this.setAuth.bind(this)
    };
  }

  getAuth() {
    if(localStorage.getItem('person')) {
      // console.log(localStorage.getItem('person'))
      return JSON.parse(localStorage.getItem('person'));
    }
    else {
      return null;
    }
  }

  setAuth(person) {
    localStorage.setItem('person', person);
  }

  //in react speak, render function
  //returns routes which we call in redirects
  //note the parametrization in some URLs--second slash fucks with proxy
  render () {
    return (
      <div className="App">
        <Helmet>
          <title>Freelance.ai</title>
          <meta charset="utf-8"></meta>
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
          <body className='tan' />
        </Helmet>
        <AppContext.Provider value={this.state}>
          <BrowserRouter>
            <div>
              <Switch>
                <Route exact path="/" component={HomeComponent} />
                <Route path="/login" component={LoginComponent} />
                <Route path="/dashboard" component={DashboardComponent} />
                <Route path="/create-account" component={CreateAccountComponent} />
                <Route path="/edit-account" component={EditAccountComponent} />
                <Route path="/create-project" component={CreateProjectComponent} />
                <Route path="/project:project_id" component={ProjectComponent} />
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
