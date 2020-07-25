import React from 'react';

/*
this is supposed to just be a good blurb box link thing for projects. */
class ProjectWidget extends React.Component {

  render() {
    return(
      <div style={{borderStyle: 'solid'}}>
        <h1>{this.props.project.title}</h1>
        <p>{this.props.project.explanation}</p>
      </div>
    )
  }
}

export default ProjectWidget;
