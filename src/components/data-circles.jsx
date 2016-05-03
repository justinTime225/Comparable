import React from 'react';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
var rand = function() {
  return Math.floor(Math.random() * 256);
};

const renderCircles = (props) => {

  return (coords, index) => {
    const circleProps = {
      cx: props.xScale(coords[0]),
      cy: props.yScale(coords[1]),
      r: 5,
      key: index,
      fill: `rgb(${rand()}, ${rand()}, ${rand()})`,
      stroke: 'black'
    };
    
    return <circle {...circleProps} onClick={() => {
      props.update(circleProps);
      console.log(circleProps); 

      
    }}/>;

  };
};

export default (props) => {
  return (
    <g>{ props.data.map(renderCircles(props)) } 
      
    </g>
  );
};
