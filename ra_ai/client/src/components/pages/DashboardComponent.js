import React from "react";
import '../../css/App.css';
import { Link, Redirect } from 'react-router-dom';
import AppContext from '../../libs/AppContext.js';

class DashboardComponent extends React.Component
{
  static contextType = AppContext;

  render ()
  {
    if (!this.context.person) {
      return <Redirect to='/login' />
    } else {
      return (
        <div>
          <h1>Hello, {this.context.person.first_name}</h1>
          <ul>
            <li><Link to="/edit-account">Login</Link></li>
          </ul>
        </div>
      );
    }
  }
}

export default DashboardComponent;
//<Link to="/edit-account">Edit Account</Link>
