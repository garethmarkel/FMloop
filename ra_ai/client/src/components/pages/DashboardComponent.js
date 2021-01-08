import React from "react";
import '../../css/App.css';
import { Link, Redirect } from 'react-router-dom';
import AppContext from '../../libs/AppContext.js';
import ProjectWidget from '../objects/ProjectWidget'
/*
Dashboard compnent: displays user links to projects, payment, etc
TODO: all projects you are the contractor on
*/
class DashboardComponent extends React.Component
{
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      projects: null,
      error: null
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.displayProjects = this.displayProjects.bind(this);
    this.freelancerRegistration = this.freelancerRegistration.bind(this);
  }

  componentDidMount() {
    if (this.context.getAuth()) {
      var person_id = this.context.getAuth().person_id;
      fetch("api/projects/getUserProjects", {
        method: 'post',
        body: JSON.stringify({
          owner_id: person_id
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(data => data.json()).then((data) => {

        this.setState(() => ({
          projects: data.projects
        }));
      }).catch((err) => {
        this.setState(() => ({
          error: "An error occurred"
        }));
      });
    }
  }

  //show all your projects you own
  displayProjects()
  {
    var activeProjects = null;

    if(this.state.projects) {
      activeProjects = this.state.projects.map((project) =>
        <li key={project.project_id}><Link to={"/project" + project.project_id}><ProjectWidget project={project} /></Link></li>);
    }

    return activeProjects;
  }

  //link to connect to register as a freelancer--if freelancer, links to available projects
  freelancerRegistration()
  {
    var registrationLink = null;
    if(!this.context.getAuth().freelancer) {
      registrationLink = <Link to='/freelancer-registration'>Become a freelancer</Link>;
    } else {
      registrationLink = <Link to='/project-list'>See Available Projects</Link>;
    }

    return registrationLink;
  }

  render ()
  {
    if (this.context.getAuth()) {
      return (
        <div>
          <h1>Hello, {this.context.getAuth().first_name}</h1>
          <br />

          <br />
          <Link to="/edit-account">Edit Account</Link>
          <br />
          <Link to="/create-project">Create Project</Link>
          <br />
          { this.freelancerRegistration() }
          <br />
          { this.displayProjects() }
          <form onSubmit={ () => { localStorage.clear() } }>
            <input type='submit' value='Logout' />
          </form>
        </div>
      );
    }
    else {
      return (<Redirect to='/login' />);
    }
  }
}

export default DashboardComponent;
