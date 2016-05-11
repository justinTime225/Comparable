import React, { Component } from 'react';
import { BarChart } from 'react-d3-components'
import _ from 'underscore';

export default class BarGraph extends Component {
  render() {

    // data storage for barchart based on Job_Matches
    // from OfferForm
    const data = { label: 'Salary', values: [] };

    // populate the data array with jobs only when
    // jobs exists
    if (this.props.job.length > 0) {
      _.each(this.props.job, (job) => {

        // case for empty jobs and 'remote_ok' in API results
        if (job.id) {
          data.values.push({
            x: `${job.title},${((job.salary_min + job.salary_max) / 2)},${((Number(job.equity_min) + Number(job.equity_max)) / 2).toFixed(2)}`,
            y: (job.salary_min + job.salary_max) / 2,
          });
        }
      });
    }

    // hover tooltip on barchart
    // displays user offer data in comparison to
    // data for current bar/job
    const tooltip = (x) => {
      // parse values from x in data
      const values = x.split(',');

      return (
        <div className="text-center">
          <h1>Offer Information</h1>
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
                <td>{this.props.offer.userOffer.title}</td>
                <td>{this.props.offer.userOffer.salary}</td>
                <td>{this.props.offer.userOffer.equity}</td>
                <td>{this.props.offer.userOffer.location}</td>
              </tr>
              <tr className="danger">
                <td>LISTING:</td>
                <td className="title">{values[0]}</td>
                <td className="salary">${values[1]}</td>
                <td className="equity">{values[2]}</td>
                <td className="location">San Francisco</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    };

    // Loader
    // prevent offer page from showing either a blank svg,
    // or a barbart with random data
    if (this.props.job.length > 0) {
      return (
        <div>
          <BarChart
            data={data}
            width={1000}
            height={900}
            margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
            tooltipHtml={tooltip}
            colorByLabel={false}
            tooltipMode={'mouse'}
            xAxis={{ tickFormat: () => { return ''; } }}
          />
        </div>
      );
    } else {
      return (
        <div className="loader-container">
          <img className="loader-img" src="https://d13yacurqjgara.cloudfront.net/users/69182/screenshots/2179253/animated_loading__by__amiri.gif" alt="Loading..." />
        </div>
      );
    };
  }
}