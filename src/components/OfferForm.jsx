/* React imports */
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

// Prevents form from being submitted without title
// The getJobs API call requires the title
const validate = values => {
  const errors = {};

  if (!values.title || values.title === 'Title') {
    errors.title = 'Required';
  }

  if (!values.location || values.location === 'Location') {
    errors.location = 'Required';
  }

  if (!values.salary) {
    errors.salary = 'Required';
  }

  if (!values.equity) {
    errors.equity = 'Required';
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
                  <label htmlFor="s1"></label>
                  <select id="s1" value="Title" className="form-control" { ...title } >
                    <option value="Title">Title</option>
                    <option value="Software Engineer">Software Engineer</option>
                    <option value="Frontend Engineer">Frontend Engineer</option>
                    <option value="Backend Engineer">Backend Engineer</option>
                    <option value="UI Engineer">UI Engineer</option>
                    <option value="Designer">Designer</option>
                  </select>
                  {title.touched && title.error && <div style={{ color: 'red' }}>{title.error}</div>}
                </div>
                <div className="form-group has-warning">
                  <label htmlFor="s2"></label>
                  <select id="s2" value="Location" className="form-control" { ...location } >
                    <option value="Location">Location</option>
                    <option value="Austin">Austin</option>
                    <option value="Irvine">Irvine</option>
                    <option value="Los Angeles">Los Angeles</option>
                    <option value="San Francisco">San Francisco</option>
                  </select>
                  {location.touched && location.error && <div style={{ color: 'red' }}>{location.error}</div>}
                </div>
                <div className="form-group has-warning">
                  <label className="sr-only" htmlFor="salary">Salary</label>
                  <input type="number" className="form-control" placeholder="Salary" autoComplete="off" { ...salary } />
                  {salary.touched && salary.error && <div style={{ color: 'red' }}>{salary.error}</div>}
                </div>
                <div className="form-group has-warning">
                  <label className="sr-only" htmlFor="equity">Equity</label>
                  <input type="number" step="0.01" className="form-control" placeholder="Equity" autoComplete="off" { ...equity } />
                  {equity.touched && equity.error && <div style={{ color: 'red' }}>{equity.error}</div>}
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
