import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

// Prevents form from being submitted without title
// The getJobs API call requires the title
const validate = values => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Required';
  }

  if (!values.location) {
    errors.location = 'Required';
  }

  return errors;
};

class OfferForm extends Component {
  render() {
    const { fields: { title, location, salary, equity }, resetForm, handleSubmit } = this.props;

    return (
      <div className="row offer-form">
        <div className="col-md-10 col-md-offset-1">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">Compare Your Offer Now!</h4>
            </div>
            <div className="panel-body">
              <form onSubmit={handleSubmit} className="form-inline offer-input">
                <div className="form-group has-warning">
                  <label className="sr-only" htmlFor="title">Title</label>
                  <input list="titles" type="text" className="form-control" placeholder="Title" autoComplete="off" { ...title } />
                  <datalist id="titles">
                    <option value="Software Engineer"></option>
                    <option value="Frontend Engineer"></option>
                    <option value="Backend Engineer"></option>
                    <option value="UI Engineer"></option>
                    <option value="Designer"></option>
                  </datalist>
                  {title.touched && title.error && <div style={{ color: 'red' }}>{title.error}</div>}
                </div>
                <div className="form-group has-warning">
                  <label className="sr-only" htmlFor="location">Location</label>
                  <input list="locations" className="form-control" placeholder="Location" autoComplete="off" { ...location } />
                  <datalist id="locations">
                    <option value="Austin"></option>
                    <option value="Irvine"></option>
                    <option value="Los Angeles"></option>
                    <option value="San Francisco"></option>
                  </datalist>
                  {location.touched && location.error && <div style={{ color: 'red' }}>{location.error}</div>}
                </div>
                <div className="form-group has-warning">
                  <label className="sr-only" htmlFor="salary">Salary</label>
                  <input type="number" className="form-control" placeholder="Salary" autoComplete="off" { ...salary } />
                </div>
                <div className="form-group has-warning">
                  <label className="sr-only" htmlFor="equity">Equity</label>
                  <input type="number" step="0.01" className="form-control" placeholder="Equity" autoComplete="off" { ...equity } />
                </div>
                <div className="form-group has-warning">
                  <button className="btn btn-success" type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

OfferForm = reduxForm({
  form: 'offer',
  fields: ['title', 'location', 'salary', 'equity'],
  validate,
})(OfferForm);

export default OfferForm;
