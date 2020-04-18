import React from 'react';
import './css/App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomeComponent from './components/pages/HomeComponent';
import LoginComponent from './components/pages/LoginComponent';
import CreateAccountComponent from './components/pages/CreateAccountComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={HomeComponent} />
            <Route path="/login" component={LoginComponent} />
            <Route path="/create-account" component={CreateAccountComponent} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
