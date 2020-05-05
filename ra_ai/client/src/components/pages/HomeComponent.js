import React from "react";
import '../../css/App.css';
import { Link } from 'react-router-dom';

/*
This class represents the very first page that unauthenticated users see.
Includes things like FAQ, website logo, example projects, and other
intro stuff. 
*/
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
