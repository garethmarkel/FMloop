import React from "react";
import { Link, Redirect } from 'react-router-dom';
/*
component to render bid input for a project
*/

class BidComponent extends React.Component {

  //this doesn't have context because it's being used as a UI "lego black", so we
  //cut straight to cosntructing
  constructor(props){
    super(props)
    this.state = {
      viewer_id: props.viewer_id,
      project: props.project,
      bids: [],
      error: null,
      proposal: null,
      expected_finish: null,
      error: null,
      message: null
    }

    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleProposalChange = this.handleProposalChange.bind(this);
    this.handleExpectedFinishChange = this.handleExpectedFinishChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.listBids = this.listBids.bind(this);
  }

  //when the commponent mounts, get all bids for a projects
  componentDidMount() {

    fetch('/api/bids/getBids', {
      method: 'post',
      body: JSON.stringify({
        project_id: this.state.project.project_id
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(data => data.json()).then((data) => {

      var parsed = data.bids;

      //be careful with mutating state directly. there's supposed to be a better way
      //[...this.state.bids, parsed]
      //but JS hates me. you might be able to copy and paste the above to get it to work
      var bid = this.state.bids.slice();

      if(typeof parsed !== 'undefined'){
        var bid = bid.concat(parsed);
      }

      if(bid.length > 0){
        this.setState(() => ({
          bids: bid
        }));
      }

      //message for if you already bid
      if(this.state.bids.some(el => el.contractor_id === this.state.viewer_id)){
        this.setState(() => ({
          message: 'You have already submitted a bid to this project.'
        }));
      }
    }).catch((err) => {
      this.setState(() => ({
        error: err.message
      }));
    });
  }

  handleProposalChange(event) {
    this.setState({proposal: event.target.value})
  }

  handleExpectedFinishChange(event) {
    this.setState({projected_finish: event.target.value})
  }

  //on submit, send bid to server
  handleSubmit(event) {
    event.preventDefault();

    console.log(this.state)
    fetch('/api/bids/submitBid', {
      method: 'post',
      body: JSON.stringify({
        project_id: this.state.project.project_id,
        contractor_id: this.state.viewer_id,
        projected_finish: this.state.projected_finish,
        proposal: this.state.proposal
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((data) => {
      console.log('Submitted?');
      this.setState(() => ({
        message: 'You have bid on this project'
      }));
    }).catch((err) => {
      this.setState(() => ({
        error: err.message
      }));
    })
  }

  //assemble list of bids
  listBids() {
    var bidlist = null;
    if(this.state.bids.length > 0){
      bidlist = this.state.bids.map((bid) =>
        <li key={bid.contractor_id}><Link to={'/bids/'+this.state.project.project_id+'/'+bid.contractor_id+'/'+this.state.project.owner_id}>{bid.proposal}, {bid.projected_finish}--{bid.person.first_name}</ Link></li>);
    }
    return bidlist;
  }

  //render is v ugly
  render() {
    if(this.props.viewer_id === this.props.project.owner_id){
      return(
        <div>
          <h1> Current Bids </h1>
          {this.listBids()}
        </div>
      )
    } else {
      if(this.state.message) {
        return(<h1>{this.state.message}</h1>);
      } else {
        return(
          <div>
            <div>
              <h1>Submit a bid</h1>
              <br />
            </div>
            <form onSubmit={this.handleSubmit}>
              <label>proposal</label>
              <input type="text" name="proposal" onChange={this.handleProposalChange} />
              <br />
              <label>Expected Finish</label>
              <input type="date" name="expected_finish" onChange={this.handleExpectedFinishChange} />
              <br />
              <input type='submit' value='Submit' />
            </form>
          </div>
        )
      }
    }
  }
}

export default BidComponent;
