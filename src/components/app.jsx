import React from 'react';
import { Component } from 'react';
import TestFile from '../containers/test';

export default class App extends Component {
  render() {
    return (
      <div>
        <p>hello world</p>
        <TestFile />
        {this.props.children}

      </div>
    );
  }
}  // ss
