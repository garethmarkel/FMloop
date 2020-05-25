/*
Right now, this home component functions as a top level directory for our other
two exterior react components. Eventually, it'll be more like a "landing page",
and be pretty content rich

2020-05-04: added basic comments (Gareth)
*/

import React from "react";
import '../../css/App.css';
import { Link } from 'react-router-dom';
import ExteriorPage from '../templates/ExteriorPage.js';
/*
This class represents the very first page that unauthenticated users see.
Includes things like FAQ, website logo, example projects, and other
intro stuff.
*/
class HomeComponent extends React.Component {
  //Render function
  //Returns two links
  render ()
  {
    return (
      <div>
        <ExteriorPage title={'Home Page'} innerHTML={
          <div>
          <div id="openingtitle" class="jumbotron jumbotron-fluid shadow bg-dark">
            <div class ="container h-75 py-5 bg-dark">
              <h2 style={{textAlign: 'center', fontFamily: 'helvetica, Arial', color: 'white'}}> A new freelancing solution or some dumb text liek that</h2>
            </div>
          </div>
          <div id="openingcarousel" class="carousel slide" data-ride="carousel">
            <ul class="carousel-indicators bg-dark">
              <li data-target="#openingcarousel" data-slide-to="0" class="active"></li>
              <li data-target="#openingcarousel" data-slide-to="1"></li>
              <li data-target="#openingcarousel" data-slide-to="2"></li>
            </ul>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="https://secure.img1-fg.wfcdn.com/im/05779092/resize-h600-w600%5Ecompr-r85/9972/99725816/Table+Lamps.jpg" alt="Lady" />
              </div>
              <div class="carousel-item">
                <img src="https://target.scene7.com/is/image/Target/56d7t-tablelamps-QUIVER-190331-1554090160454" alt="also lady" />
              </div>
              <div class="carousel-item">
                <img src="https://www.boconcept.com/on/demandware.static/-/Sites-master-catalog/default/dwf20a523f/images/20000/25866.jpg" alt="lady 3" />
              </div>
            </div>
            <a class="carousel-control-prev" href="#openingcarousel" data-slide="prev">
              <span class="carousel-control-prev-icon bg-dark"></span>
            </a>
            <a class="carousel-control-next" href="#openingcarousel" data-slide="next">
              <span class="carousel-control-next-icon bg-dark"></span>
            </a>
          </div>
          <div class="row px-5">
            <div class="col">
          <h3 style={{textAlign: 'center'}}>Fm_loop, built by mongoloids
            <br />
            built for mongoloid freelancers
          </h3>
          <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
            </div>
            <div class="col">
            <h3 style={{textAlign: 'center'}}> Freelancers love this shit
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          <div class="col">
          <h3 style={{textAlign: 'center'}}> Users hate us</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
          </div>
          <div class="container px-5">
            <h3 style={{textAlign: 'center'}}>Placeholder for image map of user dash" </h3>
          </div>
          <div class="container px-5">
            <p> Placeholder for legal stuffs </p>
          </div>
          <div>
            <Link to="/login">Login</Link>
            <br />
            <br />
            <Link to="/create-account">Create Account</Link>
          </div>
        </div> } />
      </div>
    );
  }
}

export default HomeComponent;


/*
render ()
{
  return (
    <div>
      <div>
        <head>
          <title>Home/landing page</title>
          <meta charset="utf-8"></meta>
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"></link>
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
        </head>
        <body style={{backgroundColor: 'rgb(245,245,220)'}}>
        <div id="openingtitle" class="jumbotron jumbotron-fluid shadow bg-dark">
          <div class ="container h-75 py-5 bg-dark">
            <h2 style={{textAlign: 'center', fontFamily: 'helvetica, Arial', color: 'white'}}> A new freelancing solution or some dumb text liek that</h2>
          </div>
        </div>
        <div id="openingcarousel" class="carousel slide" data-ride="carousel">
          <ul class="carousel-indicators bg-dark">
            <li data-target="#openingcarousel" data-slide-to="0" class="active"></li>
            <li data-target="#openingcarousel" data-slide-to="1"></li>
            <li data-target="#openingcarousel" data-slide-to="2"></li>
          </ul>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="https://secure.img1-fg.wfcdn.com/im/05779092/resize-h600-w600%5Ecompr-r85/9972/99725816/Table+Lamps.jpg" alt="Lady" />
            </div>
            <div class="carousel-item">
              <img src="https://target.scene7.com/is/image/Target/56d7t-tablelamps-QUIVER-190331-1554090160454" alt="also lady" />
            </div>
            <div class="carousel-item">
              <img src="https://www.boconcept.com/on/demandware.static/-/Sites-master-catalog/default/dwf20a523f/images/20000/25866.jpg" alt="lady 3" />
            </div>
          </div>
          <a class="carousel-control-prev" href="#openingcarousel" data-slide="prev">
            <span class="carousel-control-prev-icon bg-dark"></span>
          </a>
          <a class="carousel-control-next" href="#openingcarousel" data-slide="next">
            <span class="carousel-control-next-icon bg-dark"></span>
          </a>

        </div>
        <div class="row px-5">
          <div class="col">
        <h3 style={{textAlign: 'center'}}>Fm_loop, built by mongoloids
          <br />
          built for mongoloid freelancers
        </h3>
        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
          </div>
          <div class="col">
          <h3 style={{textAlign: 'center'}}> Freelancers love this shit
          </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        <div class="col">
        <h3 style={{textAlign: 'center'}}> Users hate us</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        </div>
        <div class="container px-5">
          <h3 style={{textAlign: 'center'}}>Placeholder for image map of user dash" </h3>
        </div>
        <div class="container px-5">
          <p> Placeholder for legal stuffs </p>
        </div>
        <div>
          <Link to="/login">Login</Link>
          <br />
          <br />
          <Link to="/create-account">Create Account</Link>
        </div>
      </body>
    </div>
  </div>
  );
  */
