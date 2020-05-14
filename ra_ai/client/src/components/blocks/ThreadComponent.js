import React from "react";
import AppContext from '../../libs/AppContext.js';

/*
component to render comment thread_id
*/

class ThreadComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      project_id: props.project_id,
      messages: null,
      isLoaded: null,
      error: null
    }
  }

  componentDidMount() {
    fetch('/api/threads/getMessages', {
      method: 'post',
      body: JSON.stringify({
        project_id: this.state.project_id
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(data => data.json()).then((data) => {
      console.log(data);
      console.log(data.load_thread);
      this.setState(() => ({
        isLoaded: true,
        messages: data.load_thread
      }));
    }).catch((err) => {
      this.setState(() => ({
        error: err
      }))
    });
  }

  render() {
    if (this.state.error){
      return (
        <div>
          <h1>{this.state.error.message}</h1>
        </div>
      )
    } else if (this.state.isLoaded) {
      console.log(this.state.messages.messages[0].content);
      const messages = this.state.messages.messages.map((message) =>
        <li key={message.message_id}>{message.content}</li>);
      return (
          <div>
            <ul>{messages}</ul>
          </div>
      )
    } else {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      )
    }
  }
}

export default ThreadComponent;
