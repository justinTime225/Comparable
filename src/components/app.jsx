import React from 'react';
import { Component } from 'react';
import TestFile from '../containers/test';

export default class App extends Component {
  render() {
    return (
      <div>
        hello world
        <TestFile />
        {this.props.children}
        
      </div>
    );
  }
}  // ss


