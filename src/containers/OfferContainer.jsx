import React, { Component } from 'react';
import {connect} from 'react-redux';
import OfferForm from '../components/OfferForm';
import { getJobs } from '../middleware/angelListApi.js';
import { sendJob } from '../actions/Job_Matches';
import { reset } from 'redux-form';
import { changeOffer } from '../actions/OfferActions';
import ScatterPlot from '../components/scatter-plot';
import { bindActionCreators } from 'redux';
import OfferDisplay from '../components/OfferDisplay';


// Deafult styles for graph
const styles = {
  width: 1000,
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
    dispatch(changeOffer(data));
    this.props.sendJob(data.title);
    // console.log(data);

    // Resets form fields after submission
    dispatch(reset('offer'));
  };

  render() {
    const { offer } = this.props;
    return (
      <div className="container">
        <OfferForm onSubmit={this.handleSubmit.bind(this)}></OfferForm>
        <OfferDisplay data={offer}></OfferDisplay>
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-body" >
                <ScatterPlot {...this.props} {...styles} update={updateCircle}/>
                  <h4 id="equity">Equity</h4>
                  <h4 id="salary">Salary</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  const { data, offer, job } = state;
  return {
    data,
    offer,
    job
  };
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators({sendJob}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Offer);
