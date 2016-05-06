import React, { Component } from 'react';
import {connect} from 'react-redux';
import OfferForm from '../components/OfferForm';
import { displayJob } from '../actions/Job_Display';
import { sendJob } from '../actions/Job_Matches';
import { reset } from 'redux-form';
import { changeOffer, clickJob, closeJob } from '../actions/Offer_Actions';
import ScatterPlot from '../components/scatter-plot';
import OfferDisplay from '../components/OfferDisplay';
import Modal from 'react-modal';


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
    console.log(this.props);
    // console.log(dispatch);
  }

  handleSubmit(data, dispatch) {
    dispatch(changeOffer(data));

    dispatch(sendJob(data.title, data));

    // Resets form fields after submission
    dispatch(reset('offer'));
  };

  render() {
    console.log(this.props);
    const { offer, onJobClick, onJobClose } = this.props;
    const { display, userOffer } = offer;

    return (
      <div className="container">
        <Modal
          isOpen={display}
          onRequestClose={onJobClose}
          style={customStyles}>
          <h1>Hello, world!</h1>
          <div className="text-center">
            <button className="btn btn-success text-center" onClick={onJobClose}>Close me!</button>
          </div>
        </Modal>
        <OfferForm onSubmit={this.handleSubmit} />
        <OfferDisplay data={offer} />
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
  const { data, offer, job, display } = state;
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Offer);
