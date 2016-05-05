import React, { Component } from 'react';
import {connect} from 'react-redux';
import OfferForm from '../components/OfferForm';
import { displayJob } from '../actions/Job_Display';
import { sendJob } from '../actions/Job_Matches';
import { reset } from 'redux-form';
import { changeOffer } from '../actions/OfferActions';
import ScatterPlot from '../components/scatter-plot';
// import { bindActionCreators } from 'redux';
import OfferDisplay from '../components/OfferDisplay';


// Deafult styles for graph
const styles = {
  width: 1500,
  height: 900,
  padding: 30,
};

// When a circle/plot is clicked, modify
// the clicked circles data

class Offer extends Component {
  updateCircle(circle) {
    // console.log(circle);
    // console.log(this.props);
    this.props.displayJob(circle);
    // create an action function to put current user into application state
  };

  handleSubmit(data, dispatch) {
    // Retrieves jobs data from server
    // via angelListApi.js
    dispatch(changeOffer(data));
    dispatch(sendJob(data.title));
    // this.props.sendJob(data.title);
    // console.log(data);
    
    // Resets form fields after submission
    dispatch(reset('offer'));
  };

  render() {
    console.log('=========');
    console.log(this.props.display);
    const { offer } = this.props;
    return (
      <div className="container">
        <OfferForm onSubmit={this.handleSubmit.bind(this)}></OfferForm>
        <OfferDisplay data={offer}></OfferDisplay>
        <ScatterPlot {...this.props} {...styles} update={this.updateCircle.bind(this)}/>
        <h3 id="equity">Equity</h3>
        <h3 id="salary">Salary</h3>
        {this.props.display && <pre>{this.props.display.title}</pre>}
      </div>
    );
  }
};

function mapStateToProps(state) {
  const { data, offer, job, display } = state;
  return {
    data,
    offer,
    job,
    display
  };
};
// function mapDispatchToProps(dispatch) {
//   console.log(dispatch);
// }

export default connect(mapStateToProps, {displayJob})(Offer);
