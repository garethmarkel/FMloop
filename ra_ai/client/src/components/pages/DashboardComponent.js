import React from "react";
import '../../css/App.css';
import { Link, Redirect } from 'react-router-dom';
import AppContext from '../../libs/AppContext.js';

class DashboardComponent extends React.Component
{
  static contextType = AppContext;

  render ()
  {
    if (this.context.getAuth()) {
      return (
        <div>
          <h1>Hello, {this.context.getAuth().first_name}</h1>
          <br />
          <Link to="/edit-account">Edit Account</Link>
          <br />
          <Link to="/create-project">Create Project</Link>
        </div>
      );
    }
    else {
      return (<Redirect to='/login' />);
    }
  }
}

export default DashboardComponent;
