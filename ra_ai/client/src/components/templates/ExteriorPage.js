import React from 'react';

class ExteriorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      innerHTML: props.innerHTML,
      title: this.props.title
    }
  }

  render() {
    return (
      <div>
        <head>
          <title>{this.state.title}</title>
          <meta charset="utf-8"></meta>
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"></link>
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
        </head>
        <body style={{backgroundColor: 'rgb(245,245,220)'}}>
        {this.state.innerHTML}
        </body>
      </div>
    )
  }
}

export default ExteriorPage;
