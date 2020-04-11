import React from 'react';
import '../../css/App.css';
import login from '../../routes/login';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

class HomeComponent extends React.Component
{
  render ()
  {
    return (
      <div>
        <BrowserRouter>
          <div>
            <div>
              <Link to="/login">Login</Link>
            </div>
            <Switch>
               <Route path="/login" component={login} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default HomeComponent;
