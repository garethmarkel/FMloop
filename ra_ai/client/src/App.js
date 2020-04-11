import React from 'react';
import './css/App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomeComponent from './components/home/HomeComponent';
import LoginComponent from './components/login/LoginComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={HomeComponent} />
            <Route path="/login" component={LoginComponent} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
