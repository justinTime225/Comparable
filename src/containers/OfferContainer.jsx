import React, { Component } from 'react';
import {connect} from 'react-redux';
import OfferForm from '../components/OfferForm';
import { getJobs } from '../middleware/angelListApi.js';
import { reset } from 'redux-form';
import ScatterPlot from '../components/scatter-plot';

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

  render() {
    const { dispatch, data } = this.props;

    function handleSubmit(data, dispatch) {
      // Retrieves jobs data from server
      // via angelListApi.js
      getJobs(data.title);

      // Resets form fields after submission
      dispatch(reset('offer'));
    };

    return (
      <div className="container">
        <OfferForm onSubmit={handleSubmit}></OfferForm>
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

export default connect(mapStateToProps)(Offer);
