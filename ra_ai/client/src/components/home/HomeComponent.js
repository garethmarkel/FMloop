import React from 'react';
import '../../css/App.css';
import { Link } from 'react-router-dom';

class HomeComponent extends React.Component
{
  render ()
  {
    return (
      <Link to="/login">Login</Link>
    );
  }
}

export default HomeComponent;
