import React from "react";
import '../../css/App.css';
import { Link } from 'react-router-dom';

class HomeComponent extends React.Component
{
  render ()
  {
    return (
      <div>
        <Link to="/login">Login</Link>
        <br />
        <br />
        <Link to="/create-account">Create Account</Link>
      </div>
    );
  }
}

export default HomeComponent;
