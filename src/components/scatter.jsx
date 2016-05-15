import React, { Component } from 'react';
import d3 from 'd3';
import _ from 'lodash';

var globalXScale;
var globalYScale;
var globalColorFill;

const ScatterPlotChart = {

  init(options) {
      let {el, dataset } = options;
      let chartWidth = 1060;
      let chartHeight= 700;
      this.dataset = dataset;
      this.margin = {top: 40, right: 40, bottom: 60, left: 80};
      this.width = chartWidth- this.margin.left - this.margin.right;
      this.height = chartHeight - this.margin.top - this.margin.bottom;

      // Min & Max
      this.min = d3.min(dataset, (d) => d.y);
      this.max = d3.max(dataset, (d) => d.y);

      // Y Scale
      this.yScale = this.getYScale();

      // X Scale
      this.xScale = this.getXScale();
      globalYScale = this.yScale;
      globalXScale = this.xScale;
      globalColorFill = this.getLinearColorFill;
      this.xAxis = this.getXAxis();
      this.yAxis = this.getYAxis();

      // render
      this.renderChart(el);
    },
    getYScale() {
      return d3.scale.linear()
        .domain([0,5])
        // .range([960, 60])
        .range([this.height,0]);
    },
    getXScale() {
      return d3.scale.linear()
        .domain([0, 240000])
        // .range([60, 580]);
        .range([0, this.width ]);
    },
    getXAxis() {

      return d3.svg.axis()
        .scale(this.xScale)
        .orient('bottom')
        // .ticks(4)
        // .tickFormat((d, i) => 20000*i)
        // .innerTickSize(5)
        // .outerTickSize(8)
        // .tickPadding(5);
    },
    renderXAxis() {
      this.rootNode.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0, ' + (this.height + 20) + ')')
        .call(this.xAxis);
    },
    getYAxis() {
      return d3.svg.axis()
        .scale(this.yScale)
        .orient('left')
        // .ticks(10)
        // .tickFormat((d,i) => this.yScale.ticks().map((item) => item + "%")[i])
        // .innerTickSize(5)
        // .outerTickSize(8)
        // .tickPadding(5);
    },
    renderYAxis() {
      this.rootNode.append('g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(-20, 0)')
        .call(this.yAxis);
    },
    getLinearColorScale() {
      return d3.scale.linear()
        .domain([0, 5]) // based on data
        //.domain([0, this.dataaset.length]) // based on position
        .range([0, 100]);
    },
    getLinearColorFill(d) {
      this.colorScale = this.getLinearColorScale();
      var scaleValue = Math.round(this.colorScale(d.y));
      return 'rgba('+ scaleValue +'%,0%,' + (80 -scaleValue) +'%, 0.9)';
    },
    getQuantizeColorScale() {
      this.colorScale = this.getQuantizeColorScale();
      return d3.scale.quantize()
        .domain([0, this.max]) // based on data
        .range(['#76c902', '#f5cd13', '#f96e4f']);
    },
    getQuantizeColorFill(d) {
      return this.colorScale(d.y);
    },
    getRootNode(el) {
      return d3.select(el);
    },
    renderRootNode(el) {
      return this.getRootNode(el)
        .attr('width', this.width + this.margin.left + this.margin.right)
        .attr('height', this.height + this.margin.top + this.margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + this.margin.left + ', ' + this.margin.top + ')');
    },
    getDataNodes(options) {
      return this.rootNode.selectAll(options);
    },
    renderDataNodes(options) {
      let {selector, className} = options;
      // console.log('111111')
      // console.log(this.dataset);
      return this.rootNode.selectAll(selector)
        .data(this.dataset)
        .enter()
        .append(selector)
        .attr('class', className)
        .attr('cx', (d) => this.xScale(d.x))
        .attr('cy', (d) => this.yScale(d.y))
        .attr('r', (d) => d.r)
        .attr('fill', (d) => {
          return this.getLinearColorFill(d);
        });
    },
    renderChart(el) {
      this.rootNode = this.renderRootNode(el);
      this.dataNodes = this.renderDataNodes({
        selector: 'circle',
        className: 'bubble'
      });
      this.renderXAxis();
      this.renderYAxis();
    },
    updateChart(dataset) {
      this.dataset = dataset;
      this.rootNode.selectAll("circle")
        .data(this.dataset)
        .transition()
        .delay((d, i) => i / dataset.length * 1000)
        .duration(1000)
        .ease('bounce')
        .attr('cx', (d) => this.xScale(d.x))
        .attr('cy', (d) => this.yScale(d.y))
        .attr('r', (d) => d.r)
        .attr('fill', (d) => {
          return this.getLinearColorFill(d);
        });
    }
};

let Chart = React.createClass({
  getInitialProps() {
      return {
        dataset: [],
      };
    },
    renderChart(dataset) {
      ScatterPlotChart.init({
        el: '#chart',
        dataset: dataset
        
        // pass in another prop to determines the x and y axis to replace label
      });
    },
    componentDidMount() {
      this.renderChart(this.props.dataset);
    },
    componentWillReceiveProps: function(nextProps) {
      if (typeof(nextProps.dataset) !== "undefined") {
        ScatterPlotChart.updateChart(nextProps.dataset);
      }
    },
    render() {
      return (
        <div>
          <svg id="chart" className="chartRoot"></svg>
        </div>
      );
    }
});

const ScatterPlot = React.createClass({
    // create a component will mount type of call for getMid();
    update(dataset) {
      let self = this;
      self.dataset = dataset;
      this.max = d3.max(dataset, (d) => d.y);
      this.getLinearColorScale = function() {
        return d3.scale.linear()
          .domain([0, 5]) // based on data
          //.domain([0, this.dataaset.length]) // based on position
          .range([0, 100]);
      };
      this.getLinearColorFill = function(d) {
        this.colorScale = this.getLinearColorScale();
        var scaleValue = Math.round(this.colorScale(d.y));
        return 'rgba('+ scaleValue +'%,0%,' + (80 -scaleValue) +'%, 0.9)';
      };
      d3.select('#chart').selectAll("circle")
        .data(self.dataset)
        .transition()
        .delay((d, i) => i / dataset.length * 1000)
        .duration(1000)
        .ease('bounce')
        .attr('cx', (d) => globalXScale(d.x))
        .attr('cy', (d) => globalYScale(d.y))
        .attr('r', (d) => d.r)
        .attr('fill', (d) => {
          return self.getLinearColorFill(d);
        });
    },
    getLower(user) {
      var data = this.props.job.map(data =>{
        return data.lowerRange;
      }).filter(data => {
        if (data !== 'undefined') {
          return data;
        }
      });
      if (user) {
        data.push(user);
      }
      return data;
    },
    getUpper(user) {
      var data = this.props.job.map(data =>{
        return data.upperRange;
      }).filter(data => {
        if (data !== 'undefined') {
          return data;
        }
      });
      if (user) {
        data.push(user);
      }
      return data;
    },
    getMid(user) {
      var data = this.props.job.map(data => {
        return data.midRange;
      }).filter(data => {
        if (data !== 'undefined') {
          return data;
        }
      });
      console.log('00')
      console.log(user);
      if (user) {
        data.push(user);
      }
      return data;
    },
    getInitialState() {
      return {
        dataset: []
      };
    },
    render() {
      d3.select('#chart').selectAll('g').remove();
      // if data doesn't clear then i can add user dot immediately after
      const userJob = _.last(this.props.job);
      ScatterPlotChart.init({
          el: '#chart',
          dataset: this.getMid(userJob)
        });
      const max = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.update(this.getUpper(userJob));
      };
      const min = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.update(this.getLower(userJob));
      }
      const mid = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.update(this.getMid(userJob));
      }
      // console.log(userJob);
      return (
        <div className="page">
          <div className="page-wrapper">   
            <Chart dataset={this.state.dataset} user={userJob}/>
            <button className="pure-button" onClick={min}>Get Min <span className="glyphicon glyphicon-menu-right" aria-hidden="true"></span></button>
            <button className="pure-button" onClick={max}>Get Max <span className="glyphicon glyphicon-menu-right" aria-hidden="true"></span></button>
            <button className="pure-button" onClick={mid}>Get Mid <span className="glyphicon glyphicon-menu-right" aria-hidden="true"></span></button>
          </div>
        </div>
      );
    }
});

export default ScatterPlot;
