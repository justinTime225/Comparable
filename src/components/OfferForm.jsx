import React, { Component, PropTypes } from 'react';
import {reduxForm} from 'redux-form';

// Prevents form from being submitted without title
// The getJobs API call requires the title
const validate = values => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Required';
  }

  return errors;
};

class OfferForm extends Component {
  render() {
    const { fields: { title, location, salary, equity }, resetForm, handleSubmit } = this.props;

    return (
      <div className="row">
        <div className="col-md-10 col-md-offset-1">
          <form onSubmit={handleSubmit} className="form-inline">
            <div className="form-group">
              <label className="sr-only" htmlFor="title">Title</label>
              <input type="text" className="form-control" placeholder="Title" { ...title } />
              {title.touched && title.error && <div>{title.error}</div>}
            </div>
            <div className="form-group">
              <label className="sr-only" htmlFor="location">Location</label>
              <input type="text" className="form-control" placeholder="Location" { ...location } />
            </div>
            <div className="form-group">
              <label className="sr-only" htmlFor="salary">Salary</label>
              <input type="number" className="form-control" placeholder="Salary" { ...salary } />
            </div>
            <div className="form-group">
              <label className="sr-only" htmlFor="equity">Equity</label>
              <input type="number" className="form-control" placeholder="Equity" { ...equity } />
            </div>
            <button className="btn btn-success" type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
};

OfferForm = reduxForm({
  form: 'offer',
  fields: ['title', 'location', 'salary', 'equity'],
  validate,
})(OfferForm);

export default OfferForm;
