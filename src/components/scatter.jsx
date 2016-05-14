// let React = require('react');
// let d3 = require('d3');
// let _ = require('lodash');
import React, { Component } from 'react';
import d3 from 'd3';
import _ from 'lodash';


const ScatterPlotChart = {

  init(options) {
      // chart settings
      let {el, dataset} = options;
    //todo: responsive chart height & width
    /*  let chartWidth = Math.round((document.body.clientWidth/10)*8);
      let chartHeight = (() => {
        return Math.round(450/600 * chartWidth);
      })();*/
      let chartWidth = 530;
      let chartHeight= 350;
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

      this.xAxis = this.getXAxis();
      this.yAxis = this.getYAxis();

      // render
      this.renderChart(el);
    },
    // swap out the x and y scale 
    getYScale() {
      return d3.scale.linear()
        .domain([0,100])
        .range([this.height,0]);
    },
    getXScale() {
      return d3.scale.linear()
        .domain([0, 11])
        .range([0, this.width ]);
    },
    getXAxis() {
      let labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return d3.svg.axis()
        .scale(this.xScale)
        .orient('bottom')
        .ticks(11)
        .tickFormat((d, i) => labels[i])
        .innerTickSize(5)
        .outerTickSize(8)
        .tickPadding(5);
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
        .ticks(10)
        .tickFormat((d,i) => this.yScale.ticks().map((item) => item + "%")[i])
        .innerTickSize(5)
        .outerTickSize(8)
        .tickPadding(5);
    },
    renderYAxis() {
      this.rootNode.append('g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(-20, 0)')
        .call(this.yAxis);
    },
    getLinearColorScale() {
      return d3.scale.linear()
        .domain([0, this.max]) // based on data
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
        dataset: []
      };
    },
    renderChart(dataset) {
      ScatterPlotChart.init({
        el: '#chart',
        dataset: dataset
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

let ScatterPlot = React.createClass({
  generateRandomData() {
      return _.map(_.range(12), (item,i) => {
        return {
          x: i,
          y: Math.random() * 100,
          r: Math.random() * 30
        };
      });
    },
    getInitialState() {
      return {
        dataset: this.generateRandomData()
      };
    },
    render() {
      var change = (e) => {
        e.preventDefault();
        this.setState({
          dataset: this.generateRandomData()
        });
      };
      return (
        <div className="page">
          <div className="page-wrapper">
            <h1>Scatter Plot</h1>
            <p>A scatter plot with random data. </p>
            <p>
              <strong>X Axis: </strong> Months (Jan - Dec)<br />
              <strong>Y Axis: </strong> Percentage (0 - 100%)<br />
              <strong>Color Scale: </strong> Linear scale based on y value<br />
              <strong>Animation: </strong> Transition with bounce easing on <a href="#" onClick={change}>data update</a><br />
            </p>
            <Chart dataset={this.state.dataset} />
            <button className="pure-button" onClick={change}>Update data <span className="glyphicon glyphicon-menu-right" aria-hidden="true"></span></button>
          </div>
        </div>
      );
    }
});

module.exports = ScatterPlot;
