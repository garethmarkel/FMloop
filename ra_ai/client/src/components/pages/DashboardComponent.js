import React from "react";
import '../../css/App.css';
import { Link, Redirect } from 'react-router-dom';
import AppContext from '../../libs/AppContext.js';
/*
Dashboard compnent: displays user links to projects, payment, etc
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

  render ()
  {
    if (this.context.getAuth()) {
      if(this.state.projects){
        const activeProjects = this.state.projects.map((project) =>
            <li key={project.project_id}><Link to={"/project" + project.project_id}>{project.title}</Link></li>);
        return (
          <div>
            <h1>Hello, {this.context.getAuth().first_name}</h1>
            <br />
            <Link to="/edit-account">Edit Account</Link>
            <br />
            <Link to="/create-project">Create Project</Link>
            <br />
            <ul>{activeProjects}</ul>
          </div>
        );
      } else {
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
    }
    else {
      return (<Redirect to='/login' />);
    }
  }
}

export default DashboardComponent;
