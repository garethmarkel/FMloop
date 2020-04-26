import React from 'react';
import './css/App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomeComponent from './components/pages/HomeComponent';
import LoginComponent from './components/pages/LoginComponent';
import CreateAccountComponent from './components/pages/CreateAccountComponent';

class DebugRouter extends BrowserRouter {
  constructor(props){
    super(props);
    console.log('initial history is: ', JSON.stringify(this.history, null,2))
    this.history.listen((location, action)=>{
      console.log(
        `The current URL is ${location.pathname}${location.search}${location.hash}`
      )
      console.log(`The last navigation action was ${action}`, JSON.stringify(this.history, null,2));
    });
  }
}

function App() {
  return (
    <div className="App">
      <DebugRouter>
        <div>
          <Switch>
            <Route exact path="/" component={HomeComponent} />
            <Route path="/login" component={LoginComponent} />
            <Route path="/create-account" component={CreateAccountComponent} />
          </Switch>
        </div>
      </DebugRouter>
    </div>
  );
}

export default App;
