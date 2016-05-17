/* React imports */
import React, { Component } from 'react';
import d3 from 'd3';
import _ from 'lodash';

var globalXScale;
var globalYScale;
var globalColorFill;

const ScatterPlotChart = {

  init(options) {
      let {el, dataset, maxSet } = options;
      let chartWidth = 1060;
      let chartHeight= 700;
      this.dataset = dataset;
      this.margin = {top: 40, right: 40, bottom: 60, left: 80};
      this.width = chartWidth- this.margin.left - this.margin.right;
      this.height = chartHeight - this.margin.top - this.margin.bottom;

      // Min & Max
      this.min = d3.min(dataset, (d) => d.y);
      this.max = d3.max(dataset, (d) => d.y);
      var maxRangeX = maxSet.map((obj) => {
        return obj.x;
      });
      var maxRangeY = maxSet.map((obj) => {
        return obj.y;
      });
      maxRangeX = _.reduce(maxRangeX, (a, b) => {
        return a > b ? a:b;
      });
      maxRangeY = _.reduce(maxRangeY, (a, b) => {
        return a > b ? a:b;
      });
      this.maxX = maxRangeX || 240000;
      this.maxY = maxRangeY || 5;

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
        .domain([0, this.maxY])
        // .range([960, 60])
        .range([this.height,0]);
    },
    getXScale() {
      return d3.scale.linear()
        .domain([0, this.maxX])
        // .range([60, 580]);
        .range([0, this.width ]);
    },
    getXAxis() {
      return d3.svg.axis()
        .scale(this.xScale)
        .orient('bottom')
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
    },
    renderYAxis() {
      this.rootNode.append('g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(-20, 0)')
        .call(this.yAxis);
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
      return this.rootNode.selectAll(selector)
        .data(this.dataset)
        .enter()
        .append(selector)
        .attr('class', className)
        .attr('cx', (d) => this.xScale(d.x))
        .attr('cy', (d) => this.yScale(d.y))
        .attr('r', (d) => d.r)
        .attr('fill', (d) => {
          return d.color;
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
        maxSet: []
      };
    },
    renderChart(dataset, maxSet) {
      ScatterPlotChart.init({
        el: '#chart',
        dataset: dataset,
        maxSet: maxSet
        // pass in another prop to determines the x and y axis to replace label
      });
    },
    componentDidMount() {
      this.renderChart(this.props.dataset, this.props.maxSet);
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
    update(dataset) {
      let self = this;
      self.dataset = dataset;
      this.max = d3.max(dataset, (d) => d.y);
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
          return d.color;
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
      if (user) {
        data.push(user);
      }
      return data;
    },
    getInitialState() {
      return {
        dataset: [],
        maxSet: []
      };
    },
    render() {
      d3.select('#chart').selectAll('g').remove();
      // clear data upon each render
      const userJob = _.last(this.props.job);
      ScatterPlotChart.init({
          el: '#chart',
          dataset: this.getMid(userJob),
          maxSet: this.getUpper(userJob)
        });
      const max = (e) => {
        e.preventDefault();
        this.update(this.getUpper(userJob));
      };
      const min = (e) => {
        e.preventDefault();
        this.update(this.getLower(userJob));
      }
      const mid = (e) => {
        e.preventDefault();
        this.update(this.getMid(userJob));
      }
      return (
        <div className="page">
          <div className="page-wrapper">
            <Chart dataset={this.state.dataset} maxSet={this.state.maxSet}/>
            <button className="btn btn-danger" onClick={min}>Get Min <span className="glyphicon glyphicon-menu-right" aria-hidden="true"></span></button>
            <button className="btn btn-primary" onClick={max}>Get Max <span className="glyphicon glyphicon-menu-right" aria-hidden="true"></span></button>
            <button className="btn btn-warning" onClick={mid}>Get Mid <span className="glyphicon glyphicon-menu-right" aria-hidden="true"></span></button>
          </div>
        </div>
      );
    }
});

export default ScatterPlot;
