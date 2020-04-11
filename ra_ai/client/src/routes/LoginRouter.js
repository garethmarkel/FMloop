import React from 'react';
import LoginComponent from '../components/login/LoginComponent';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

//import PageComponent from './components/pageComponent';
////Page Tiers:
///Page = f(component) = x*COmponeny +z


//We're in LoginPage
//Once we have aesthetic things that go to many pages, we want those all in one replace
//pageComponent.js file
//for unique pages, like login, we have parent component LoginComponent, which in turn can have child components
//So Login.js would create a page by passing loginComponent.js to pageCompnent.js to create a stylistically consistent Login Page


///components
///components/dashboard
///components/project
///components/pages (dahsboard, login, project, etc)
///components/templates (exteriroPageComponent, interiorPageComponent)
///components/templates/general


//page compnent, into which we drop LoginComponent in
class LoginRouter extends React.Component {
  render()
  {
    return (
      <div>
        <BrowserRouter>
          <div>
            <div>
              <Link to="/login">Login</Link>
            </div>
            <Switch>
               <Route path="/login" component={LoginComponent} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default LoginRouter;
