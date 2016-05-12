import React, { Component } from 'react';

export default class OfferDisplay extends Component {
  render() {
    // Grab the offer property from the props
    const { userOffer, jobs } = this.props.data;

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
    let salaryDiff = Math.round(((userOffer.salary - salaryAvg) / salaryAvg) * 100);
    let equityDiff = Math.round(((userOffer.equity - equityAvg) / equityAvg) * 100);
    let totalDiff = salaryDiff + equityDiff;

    let circleClass = '';
    let arrowClass = '';

    if (salaryDiff < 0) {
      circleClass = 'responsive-circle red-circle';
      arrowClass = 'arr-down';
    } else {
      circleClass = 'responsive-circle green-circle';
      arrowClass = 'arr-up';
    }

    // Render the job offer information on the page
    return (
      <div className="row offer-form">
        <div className="col-md-1 col-md-offset-2">
          {userOffer &&
          <div className={circleClass}>
            <div className="circle-inner">{salaryDiff}%<br></br><i className={arrowClass}></i></div>
          </div>}
        </div>
        <div className="col-md-5">
          {userOffer &&
            <ul className="displayList">
              <li className="text-center offerTitle">{userOffer.title}</li>
              <li className="text-center">
                Location: {userOffer.location} | Salary: {userOffer.salary} | Equity: {userOffer.equity}
              </li>
            </ul>
          }
        </div>
      </div>
    );
  }
}
