import React, { Component } from 'react';
import {connect} from 'react-redux';
import OfferForm from '../components/OfferForm';
import { getJobs } from '../middleware/angelListApi.js';
import { sendJob } from '../actions/Job_Matches';
import { reset } from 'redux-form';
import ScatterPlot from '../components/scatter-plot';
import { bindActionCreators } from 'redux';

// Deafult styles for graph
const styles = {
  width: 1500,
  height: 900,
  padding: 30,
};

// When a circle/plot is clicked, modify
// the clicked circles data
const updateCircle = (circle) => {
  circle.fill = 'black';
};

class Offer extends Component {
  // componentWillMount() {
  //   console.log('---');
  //   console.log(sendJob);
  // }
  handleSubmit(data, dispatch) {
    // Retrieves jobs data from server
    // via angelListApi.js
    // console.log(data.title);
    this.props.sendJob(data.title);
    // console.log(data);

    // Resets form fields after submission
    dispatch(reset('offer'));
  };

  render() {
    // const { dispatch, data } = this.props;
    
    return (
      <div className="container">
        <OfferForm onSubmit={this.handleSubmit.bind(this)}></OfferForm>
        <ScatterPlot {...this.props} {...styles} update={updateCircle}/>
          <h3 id="equity">Equity</h3>
          <h3 id="salary">Salary</h3>
      </div>
    );
  }
};

function mapStateToProps(state) {
  const { data } = state;
  return {
    data,
  };
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators({sendJob}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Offer);
