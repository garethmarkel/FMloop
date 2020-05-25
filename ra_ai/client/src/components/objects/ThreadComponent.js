import React from "react";

/*
component to render comment thread_id
*/

class ThreadComponent extends React.Component {
  //this component is a subcomponent--doesn't need context
  constructor(props){
    super(props);
    this.state = {
      project_id: props.project_id,
      person_id: props.person_id,
      messages: null,
      isLoaded: null,
      error: null,
      new_comment: ''
    }

    //bind functions
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //handle changes to the comment field
  handleCommentChange(e) {
    this.setState({
      new_comment: e.target.value
    });
  }

  //write messages to database
  handleSubmit(event) {
    event.preventDefault()
    fetch('/api/threads/writeMessage', {
      method: 'post',
      body: JSON.stringify({
        thread_id: this.state.thread_id,
        sender_id: this.state.person_id,
        content: this.state.new_comment
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(data => data.json()).then((data) => {

      // console.log("Hi");
      var ary = this.state.messages;
      ary.push(data.message);
      console.log(ary);
      this.setState(() => ({
        messages: ary,
        new_comment: ''
      }));
    }).catch((err) => {
      this.setState(() => ({
        error: err
      }));
    });

  }

  componentDidMount() {
    console.log("Hi");
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
      this.setState(() => ({
        isLoaded: true,
        messages: data.load_thread.messages,
        participants: data.load_thread.thread_participants,
        thread_id: data.load_thread.thread_id
      }));
    }).catch((err) => {
      this.setState(() => ({
        error: err
      }))
    });
  }

  render() {

    //print out error: we probaby want to not show stack trace, view later
    if (this.state.error){
      return (
        <div>
          <h1>{this.state.error.message}</h1>
        </div>
      )
    } else if (this.state.isLoaded) {
      //map comments
      const messages = this.state.messages.map((message) =>
        <li key={message.message_id}>{message.content}</li>);
      //html needs rewriting
      return (
          <div>
            <ul>{messages}</ul>
            <form onSubmit={this.handleSubmit}>
              <input type='text' value={this.state.new_comment} label='new_comment' onChange={this.handleCommentChange}/>
              <input type='submit' value='Submit' />
            </form>
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
