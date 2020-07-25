import React from "react";
import AppContext from '../../libs/AppContext.js';
import { Link, Redirect } from 'react-router-dom';
/*
This page is where users can register as freelancers.
Right now, it just registers you on load.
*/
class FreelancerRegistrationComponent extends React.Component {
  static contextType = AppContext;

  constructor(props){
    super(props);
    this.state = {
      redirect: null,
      error: null,
      message: ''
    }

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  //when the component mounts, you're registered. that's it. later, there will be a questionairre
  componentDidMount() {
    if(this.context.getAuth()){
      var owner_id = this.context.getAuth().person_id;
      fetch("api/people/becomeFreelancer", {
        method: 'post',
        body: JSON.stringify({
          person_id: owner_id
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(data => data.json()).then((data) => {

        this.context.setAuth(JSON.stringify(data.person));

        this.setState(() => ({
          message: 'Congrats! You are now freelancer'
        }));
      }).catch((err) => {
        this.setState(() => ({
          error: "Error getting project."
        }));
      });
    } else {
      this.setState({
        redirect: '/login'
      });
    }
  }

  render() {
    if(this.state.redirect){
      return (
        <Redirect to={this.state.redirect} />
      );
    }
    return(
      <div>
        <h1>{this.state.error ? this.state.error : this.state.message}</h1>
        <Link to='/dashboard'>My Dashboard</Link>
      </div>
    )
  }

}

export default FreelancerRegistrationComponent;
