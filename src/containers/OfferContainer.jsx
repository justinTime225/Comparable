import React, { Component } from 'react';
import {connect} from 'react-redux';
import OfferForm from '../components/OfferForm';
import { displayJob } from '../actions/Job_Display';
import { sendJob } from '../actions/Job_Matches';
import { getSkills } from '../actions/Skills_Actions'; 
import { reset } from 'redux-form';
import { changeOffer, clickJob, closeJob } from '../actions/Offer_Actions';
import ScatterPlot from '../components/scatter-plot';
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
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


// When a circle/plot is clicked, modify
// the clicked circles data

class Offer extends Component {
  updateCircle = (circle, dispatch) => {
  }

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
    console.log(this.props);
    console.log(data);
    this.props.getSkills(data);
  }

  handleSubmit(data, dispatch) {

    dispatch(changeOffer(data));

    dispatch(sendJob(data.title, data));
    this.saveOffer(data);
    this.skillAction.call(this, data);
    // Resets form fields after submission
    dispatch(reset('offer'));
  };

  render() {
    const { offer, job, onJobClick, onJobClose } = this.props;
    const { display, userOffer } = offer;

    // Compile data to send to the display component
    const displayData = {
      userOffer: userOffer,
      jobs: job
    };

    return (
      <div className="container">
        <Modal
          isOpen={display}
          onRequestClose={onJobClose}
          style={customStyles}>
          <h1>Offer Information</h1>
          <div className="text-center">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Title</th>
                  <th>Salary (Avg.)</th>
                  <th>Equity (Avg.)</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                <tr className="success">
                  <td>OFFER:</td>
                  <td>{userOffer.title}</td>
                  <td>{userOffer.salary}</td>
                  <td>{userOffer.equity}</td>
                  <td>{userOffer.location}</td>
                </tr>
                <tr className="danger">
                  <td>LISTING:</td>
                  <td>{display.title}</td>
                  <td>{Math.floor((display.salary_max + display.salary_min)/2)}</td>
                  <td>{Math.floor((+display.equity_max + +display.equity_min)/2)}</td>
                  <td>San Francisco</td>
                </tr>
              </tbody>
            </table>
            <button className="btn btn-success text-center" onClick={onJobClose}>Close me!</button>
          </div>
        </Modal>
        <OfferForm onSubmit={this.handleSubmit.bind(this)} />
        <OfferDisplay data={displayData} />
        <div className="row">
          <div className="col-md-12">
            <div className="panel-heading">

            </div>
            <div className="panel panel-default">
              <div className="panel-body" >
                <ScatterPlot {...this.props} {...styles} update={onJobClick} />
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
    getSkills: (data) => {
      dispatch(getSkills(data));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Offer);
