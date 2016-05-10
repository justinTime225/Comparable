import React, { Component } from 'react';

export default class OfferDisplay extends Component {
  render() {
    // Grab the offer property from the props
    const { userOffer, jobs } = this.props.data;
    console.log(jobs);

    // Calculate average salary / equity
    let salarySum = 0;
    let equitySum = 0;
    let count = 0;

    jobs.forEach((job) => {
      if (job.salary_min && job.salary_max && job.equity_min && job.equity_max) {
        // not all jobs have these things, so to give an accurate Avg
        // we must mee track of count

        count++;
        salarySum += Math.round((job.salary_min + job.salary_max));
        equitySum += Math.round((Number(job.equity_min) + Number(job.equity_max)));
      }
    });

    let salaryAvg = Math.round(salarySum / (count * 2));
    let equityAvg = Math.round(equitySum / (count * 2));
    console.log(salaryAvg, equityAvg);

    // Render the job offer information on the page
    return (
      <div className="row offer-form">
        <div className="col-md-10 col-md-offset-1">
          {userOffer &&
            <ul className="displayList">
              <li className="text-center offerTitle">{userOffer.title}</li>
              <li className="text-center">
                Location: {userOffer.location} | Salary: {userOffer.salary} | Equity: {userOffer.equity}
              </li>
            </ul>}
        </div>
      </div>
    );
  }
}
