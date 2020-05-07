import React from "react";
import '../../css/App.css';
import { Link } from 'react-router-dom';
import AppContext from '../../libs/AppContext.js';

class DashboardComponent extends React.Component {
  static contextType = AppContext;

  render ()
  {
    console.log(this.context.person);
    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    );
  }
}

export default DashboardComponent;
//<Link to="/edit-account">Edit Account</Link>
