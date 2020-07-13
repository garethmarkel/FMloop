import React from "react";
import AppContext from '../../libs/AppContext.js';
import { Redirect, Link } from "react-router-dom";
import ThreadComponent from "../objects/ThreadComponent.js";
import BidComponent from "../objects/BidComponent.js";

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
      owner_id: null,
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

  //on mount, get all the details for your project
  componentDidMount() {
    const {project_id} = this.props.match.params;
    if(this.context.getAuth()){

      fetch("api/projects/getProject", {
        method: 'post',
        body: JSON.stringify({
          project_id: project_id
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
          created: data.project.created,
          owner_id: data.project.owner_id
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

  //render project details, bids, and threads
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
    } else if (this.state.project_id) {
      return (
        <div>
          <h1>{this.state.title}</h1>
          <br />
          <h2>Price: ${this.state.price}</h2>
          <h2>Due: {this.state.due_date}</h2>
          <br />
          <p>{this.state.explanation}</p>
          <br />
          <BidComponent project={this.state} viewer_id={this.context.getAuth().person_id} />
          <br />
          <ThreadComponent project_id={this.state.project_id} person_id={this.context.getAuth().person_id}/>
          <br />
          <Link to="/dashboard">Return to my dashboard</Link>
        </div>
      );
    } else {
      //this should become a sub-component in ../blocks/
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      )
    }
  }
}

export default ProjectComponent;
