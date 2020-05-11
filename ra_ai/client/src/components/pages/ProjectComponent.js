import React from "react";
import AppContext from '../../libs/AppContext.js';
import { Redirect, Link } from "react-router-dom";


/*
Home page for a given project.
Redirects to login if not authenticated.
Later updates: display comment thread on project, and owner rating (if viewer is a freelancer)
*/
class ProjectComponent extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      project_id: null,
      title: null,
      explanation: null,
      price: null,
      due_date: null,
      created: null,
      error: null,
      redirect: null,
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const {project_id} = this.props.match.params;
    if(this.context.getAuth()){
      var owner_id = this.context.getAuth().person_id;
      fetch("api/projects/getProject", {
        method: 'post',
        body: JSON.stringify({
          project_id: project_id,
          owner_id: owner_id
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(data => data.json()).then((data) => {
        this.setState(() => ({
          project_id: data.project.project_id,
          title: data.project.title,
          explanation: data.project.explanation,
          price: data.project.price,
          due_date: data.project.due_date,
          created: data.project.created
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
    if(this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    } else if (this.state.error) {
      return (
        <div>
          <h1>{this.state.error}</h1>
          <br />
          <Link to="/dashboard">Return to my dashboard</Link>
        </div>
      );
    } else {
      return (
        <div>
          <h1>{this.state.title}</h1>
          <br />
          <h2>Price: ${this.state.price}</h2>
          <h2>Due: {this.state.due_date}</h2>
          <br />
          <p>{this.state.explanation}</p>
          <br />
          <br />
          <br />
          <Link to="/dashboard">Return to my dashboard</Link>
        </div>
      );
    }
  }
}

export default ProjectComponent;
