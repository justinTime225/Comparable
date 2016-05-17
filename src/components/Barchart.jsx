/* React imports */
import React, { Component } from 'react';
import { BarChart } from 'react-d3-components'
import _ from 'underscore';

export default class BarGraph extends Component {
  render() {

    let data = '';

    // data storage for barchart based on Job_Matches from offerForm
    const salary = { label: 'Salary', values: [] };
    const equity = { label: 'Equity', values: [] };

    // populate the data array with jobs only when a job exists
    if (this.props.job.length > 0) {
      _.each(this.props.job, (job) => {

        // case for empty jobs and 'remote_ok' in API results
        if (job.id) {
          salary.values.push({
            x: `${job.title},${((job.salary_min + job.salary_max) / 2)},${((Number(job.equity_min) + Number(job.equity_max)) / 2).toFixed(2)}`,
            y: (job.salary_min + job.salary_max) / 2,
          });

          equity.values.push({
            x: `${job.title},${((job.salary_min + job.salary_max) / 2)},${((Number(job.equity_min) + Number(job.equity_max)) / 2).toFixed(2)}`,
            y: (Number(job.equity_min) + Number(job.equity_max)) / 2,
          });
        } else if (job.salary) {
          salary.values.push({
            x: `${job.title},${job.salary},${job.equity}`,
            y: job.salary,
          });

          equity.values.push({
            x: `${job.title},${job.salary},${job.equity}`,
            y: Number(job.equity),
          });
        }
      });
    }

    if (this.props.dataType === 'salary') {
      data = salary;
    } else {
      data = equity;
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
          <div className="btn-group toggle-btn active" role="group" aria-label="...">
            <button onClick={() => { this.props.toggleChart('salary') }} type="button" className="btn btn-default">Salary</button>
            <button onClick={() => { this.props.toggleChart('equity') }} type="button" className="btn btn-default">Equity</button>
          </div>
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
        <div>
          <div className="row">
            <h3 className="offersWaiting">Waiting for Offers...</h3>
          </div>
          <div className="loader-container">
            <div className="sk-folding-cube">
              <div className="sk-cube1 sk-cube"></div>
              <div className="sk-cube2 sk-cube"></div>
              <div className="sk-cube4 sk-cube"></div>
              <div className="sk-cube3 sk-cube"></div>
            </div>
          </div>
        </div>
      );
    };
  }
}

// <img className="loader-img" src="https://d13yacurqjgara.cloudfront.net/users/69182/screenshots/2179253/animated_loading__by__amiri.gif" alt="Loading..." />
