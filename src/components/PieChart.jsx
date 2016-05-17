/* React imports */
import React, { Component } from 'react';

/* Components */
import { PieChart } from 'react-d3-components';

export default class PieGraph extends Component {
  render() {
    let { skill } = this.props;

    skill = skill.filter(function(item, index) {
      return item.count > 1 && item.skill !== 'San Francisco' && index < 19;
    });

    let skills = skill.map((item) => {
      return {x: item.skill, y: item.count }
    });

    let data = {
      label: 'Skills',
      values: skills,
    }

    const sort = (a,b) => {
      return b-a;
    }

    const label = (a) => {
      return false;
    }

    let tooltipPie = (x, y) => {
      return (x.toString() + ': ' + y.toString());
    };

    return (
      <div>
        <PieChart
          data={data}
          width={1200}
          height={800}
          margin={{top: 10, bottom: 10, left: 100, right: 100}}
          sort={sort}
          tooltipHtml={tooltipPie}
          label={label}
          />
        <div className="experimental">Note: This component is experimental.</div>
      </div>
    );
  }
};
