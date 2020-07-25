import React from 'react';
import '../../css/App.css';
import { Link, Redirect } from 'react-router-dom';
import AppContext from '../../libs/AppContext.js';
import ProjectWidget from '../objects/ProjectWidget';
import {Helmet} from 'react-helmet';
/*
This file is the code for a searchable list of available projects.
It need sprettifying, and a search engine. As it exists now, it exists for processflow
*/

class AvailableProjectsListComponent extends React.Component {

  //initialize context
  static contextType = AppContext;

  //condtruct the component
  constructor(props){
    super(props)
    this.state = {
      redirect: null,
      projects: null
    }

    this.componentDidMount = this.componentDidMount.bind(this);
    this.displayProjects = this.displayProjects.bind(this);
  }


  //when the component mounts, we want to get all avaliable projects
  //later, this will be all appropriate projects, and probably get in batches of 10
  componentDidMount() {
    if(!this.context.getAuth()){
      this.setState({
        redirect: '/login'
      });
    } else if (!this.context.getAuth().freelancer){
      this.setState({
        redirect: '/dashboard'
      });
    } else {
      fetch("api/projects/getAvailableProjects", {
        method: 'post',
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

  //list of projects. excludes ones viewer owns
  displayProjects()
  {
    var activeProjects = null;

    if(this.state.projects) {
      activeProjects = this.state.projects.map((project) => {
        if(project.owner_id !== this.context.getAuth().person_id){
          return(<li key={project.project_id}><Link to={"/project" + project.project_id}><ProjectWidget project={project} /></Link></li>);
        }
      });
    }

    return activeProjects;
  }

  //render function. ugly
  render() {
    if(this.state.redirect){
      return <Redirect to={this.state.redirect} />
    } else {
      return(
        <div>
          <Helmet>
            <title>Available Projects</title>
          </Helmet>
          <h1>Available Projects</h1>
          <br />
          {this.displayProjects()}
        </div>
      )
    }
  }

}

export default AvailableProjectsListComponent;
