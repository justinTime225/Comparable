import React from 'react';

const renderCircles = (props) => {
  // return a closure function
  return (coords, index) => {
    // add details to the job circles
    const circleProps = {
      cx: props.xScale(coords.mean[0]),
      cy: props.yScale(coords.mean[1]),
      r: 10,
      key: index,
      fill: `rgb(47, 147, ${Math.floor((props.xScale(coords.mean[0]) / 2000) * 255)})`,
      stroke: `rgb(47, 147, ${Math.floor((props.xScale(coords.mean[0]) / 2000) * 255)})`,
    };

    // change color if the coords object is an offer that user created
    if (coords.user) {
      circleProps.fill = '#ff8a37';
      circleProps.stroke = '#ff8a37';
    }

    // plot each job on the scatterplot
    return (<svg><circle {...circleProps} onClick={() => { props.update(coords); }}><title>Click for more details!</title></circle></svg>);
  };
};

export default (props) => {
  return (

    // renderCircle(props) returns a callback
    <g>
      {props.job.map(renderCircles(props))}
    </g>
  );
};
