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
    this.props.displayJob(circle);
  };

  handleSubmit(data, dispatch) {

    dispatch(changeOffer(data));
    dispatch(sendJob(data.title));
    
    // Resets form fields after submission
    dispatch(reset('offer'));
  };
  displayJob() {
    if (!this.props.display) {
      return (
        <div>
          <h3>Title: xxx</h3>
          <h3>Equity Min: xxx</h3>
          <h3>Equity Max: xxx</h3>
          <h3>Salary Max: xxx</h3>
          <h3>Salary Max: xxx</h3>
          <h3>Equity Max: xxx</h3>
        </div>
      );
    }
    else {
      return (
        <div>
          <h3>Title: {this.props.display.title}</h3>
          <h3>Equity Min: {this.props.display.equity_min}</h3>
          <h3>Equity Max: {this.props.display.equity_max}</h3>
          <h3>Salary Max: {this.props.display.salary_min}</h3>
          <h3>Salary Max: {this.props.display.salary_max}</h3>
          <h3>Equity Max: {this.props.display.equity_max}</h3>
        </div>
      );
      
    }
  }

  render() {
    console.log('=========');
    console.log(this.props.display);
    const { offer } = this.props;

    return (
      <div className="container">
        <OfferForm onSubmit={this.handleSubmit.bind(this)}></OfferForm>
        <OfferDisplay data={offer}></OfferDisplay>
        {this.displayJob()}
        <ScatterPlot {...this.props} {...styles} update={this.updateCircle.bind(this)}/>
        <h3 id="equity">Equity</h3>
        <h3 id="salary">Salary</h3>
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
