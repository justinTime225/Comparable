import React from 'react';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
var rand = function() {
  return Math.floor(Math.random() * 256);
};

const renderCircles = (props) => {

  return (coords, index) => {

    const circleProps = {
      cx: props.xScale(coords.mean[0]),
      cy: props.yScale(coords.mean[1]),
      r: 5,
      key: index,
      fill: `rgb(47, 147, ${Math.floor((props.xScale(coords.mean[0])/2000) * 255)})`,
      stroke: 'black'
    };
    // console.log(circleProps);
    return <circle {...circleProps} onClick={() => {
      props.update(circleProps);
      console.log(circleProps); 

    }}/>;

  };
};

export default (props) => {
  // console.log('inside data circle');
  // console.log(props.job);
  return (
    <g>{ props.job.map(renderCircles(props)) } 
      
    </g>
  );
};
