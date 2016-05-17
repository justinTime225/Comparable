/* React imports */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import axios from 'axios';

/* Components */
import OfferForm from '../components/OfferForm';
import BarGraph from '../components/Barchart'
import OfferDisplay from '../components/OfferDisplay';

/* Action creators */
import { changeOffer, clickJob, closeJob, toggleChart } from '../actions/Offer_Actions';
import { sendJob, getUserOffers } from '../actions/Job_Matches';
import { displayJob } from '../actions/Job_Display';
import { getSkills } from '../actions/Skills_Actions';

class Offer extends Component {
  // Saves the users offer to DB
  saveOffer(data) {
    let email = JSON.parse(localStorage.profile).email;

    let offerObj = {
      title: data.title,
      location: data.location,
      salary: data.salary,
      equity: data.equity,
      userEmail: email,
    };

    axios.post('/api/offers', offerObj);

  }

  handleSubmit(data, dispatch) {
    // Dispatch actions
    dispatch(changeOffer(data));
    dispatch(sendJob(data, data));

    // Save offer to DB
    this.saveOffer(data);

    // Resets form fields after submission
    dispatch(reset('offer'));
  }

  offerType: 'jobs'

  switchOffers() {
    const { userOffer } = this.props.offer;
    const { userOffers, jobOffers } = this.props;

    if (this.offerType === 'jobs' || this.offerType === undefined) {
      userOffers(userOffer, userOffer);
      this.offerType = 'users';
    } else {
      jobOffers(userOffer, userOffer);
      this.offerType = 'jobs';
    }
  }

  render() {
    const { offer, job, toggleChart } = this.props;
    const { display, userOffer, dataType } = offer;

    let offerDisplayType = 'Toggle Users';

    if (this.offerType === 'users') {
      offerDisplayType = 'Toggle Jobs';
    }

    // Compile data to send to the display component
    const displayData = {
      userOffer: userOffer,
      jobs: job
    };

    // Check for jobs in current state
    let existingJobs = displayData.jobs.length > 0;

    return (
      <div className="container">
        <OfferForm onSubmit={this.handleSubmit.bind(this)} />
        <OfferDisplay data={displayData} />
        <div className="row">
          <div className="col-md-12">
            <div className="panel-heading">
            </div>
            <div className="panel panel-default">
              <div className="panel-body" >
                {existingJobs &&
                  <div className="btn-group toggle-btn active" role="group" aria-label="...">
                    <button onClick={() => this.switchOffers()} type="button" className="btn btn-default">{offerDisplayType}</button>
                  </div>
                }
                <BarGraph { ...this.props } toggle={toggleChart} dataType={dataType} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  const { offer, job } = state;
  return {
    offer,
    job,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleChart: (dataType) => {
      dispatch(toggleChart(dataType));
    },
    userOffers: (data) => {
      dispatch(getUserOffers(data));
    },
    jobOffers: (data) => {
      dispatch(sendJob(data, data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Offer);
