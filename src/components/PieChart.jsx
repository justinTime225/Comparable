import React, { Component } from 'react';
import { PieChart } from 'react-d3-components';

export default class PieGraph extends Component {
  render() {
    console.log(PieChart.propTypes);
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

    const sort = null;

    let tooltipPie = (x, y) => {
      return y.toString();
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
          />
      </div>
    );
  }
};
