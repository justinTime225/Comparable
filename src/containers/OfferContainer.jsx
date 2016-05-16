import React, { Component } from 'react';
import {connect} from 'react-redux';
import OfferForm from '../components/OfferForm';
import { displayJob } from '../actions/Job_Display';
import { sendJob, getUserOffers } from '../actions/Job_Matches';
import { getSkills } from '../actions/Skills_Actions';
import { reset } from 'redux-form';
import { changeOffer, clickJob, closeJob, toggleChart } from '../actions/Offer_Actions';
import BarGraph from '../components/Barchart'
import OfferDisplay from '../components/OfferDisplay';
import Modal from 'react-modal';
import axios from 'axios';

// Deafult styles for graph
const styles = {
  width: 1000,
  height: 900,
  padding: 30,
};

// Styles for Modal
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// When a circle/plot is clicked, modify
// the clicked circles data

class Offer extends Component {
  saveOffer(data) {
    var email = JSON.parse(localStorage.profile).email;
    var offerObj = {
      title: data.title,
      location: data.location,
      salary: data.salary,
      equity: data.equity,
      userEmail: email
    };
    axios.post('/api/offers', offerObj)
    .then(function (response) {
      // Do something?
    })
    .catch(function (response) {
      // Do something?
    });

  }

  skillAction(data) {
    this.props.getSkills(data);
  }

  handleSubmit(data, dispatch) {

    dispatch(changeOffer(data));

    dispatch(sendJob(data, data));
    this.saveOffer(data);
    // this.skillAction.call(this, data);
    // Resets form fields after submission
    dispatch(reset('offer'));
  }

  offerType: 'jobs'

  switchOffers() {
    const { userOffer } = this.props.offer;
    const { userOffers, jobOffers } = this.props;


    console.log(userOffer);

    if (this.offerType === 'jobs' || this.offerType === undefined) {
      userOffers(userOffer, userOffer);
      this.offerType = 'users';
    } else {
      jobOffers(userOffer, userOffer);
      this.offerType = 'jobs';
    }
  }

  render() {
    const { offer, job, onJobClick, onJobClose, toggleChart } = this.props;
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

// <ScatterPlot {...this.props} {...styles} update={onJobClick} />
// <h4 id="equity">Equity</h4>
// <h4 id="salary">Salary</h4>

function mapStateToProps(state) {
  const { offer, job } = state;
  return {
    // skill,
    offer,
    job,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onJobClick: (job) => {
      dispatch(clickJob(job));
    },

    onJobClose: () => {
      dispatch(closeJob());
    },
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
