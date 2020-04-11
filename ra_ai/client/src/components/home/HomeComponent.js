import React from 'react';
import '../../css/App.css';
import LoginRouter from '../../routes/LoginRouter';

class HomeComponent extends React.Component
{
  render ()
  {
    return (
      <LoginRouter />
    );
  }
}

export default HomeComponent;
