import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import AppContext from '../../libs/AppContext.js';
/* component to pick bid. minimal, as it stands */

class PickBidComponent extends React.Component {

  //register context
  static contextType = AppContext;

  constructor(props){

    super(props);

    this.state = {
      redirect: null,
      error: null,
      project_id: this.props.match.params.project_id,
      contractor_id: this.props.match.params.contractor_id,
      owner_id: this.props.match.params.owner_id,
      bid: null
    }

    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //when the component mounts, you're registered. that's it. later, there will be a questionairre
  componentDidMount() {

    if(this.context.getAuth().person_id == this.state.owner_id){
      console.log(this.state);
      fetch("/api/bids/getProjectBid", {
        method: 'post',
        body: JSON.stringify({
          contractor_id: this.state.contractor_id,
          project_id: this.state.project_id
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(data => data.json()).then((data) => {

        this.setState(() => ({
          bid: data.bid
        }));
      }).catch((err) => {
        this.setState(() => ({
          error: "Error getting bid."
        }));
      });
    } else {
      this.setState({
        redirect: '/login'
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    fetch("/api/bids/setContracted", {
      method: 'post',
      body: JSON.stringify({
        contractor_id: this.state.contractor_id,
        project_id: this.state.project_id
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(data => data.json()).then((data) => {
      this.setState(() => ({
        redirect: '/project'+this.state.project_id
      }));
    }).catch((err) => {
      this.setState(() => ({
        error: err
      }))
    })

  }

  render() {
    if(this.state.redirect){
      return (
        <Redirect to={this.state.redirect} />
      );
    }
    return(
      <div>
        <h1>{this.state.bid ? this.state.bid.proposal : ''}</h1>
        <form onSubmit={this.handleSubmit}>
          <input type='submit' value='Submit' />
        </form>
        <Link to={'/project' + this.state.project_id}>Return to project</Link>
      </div>
    )
  }
}

export default PickBidComponent;
