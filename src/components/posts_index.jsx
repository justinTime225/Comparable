import React, { Component } from 'react';

export default class Test extends Component {
  render() {
    console.log(this.context);
    return (
      <div>
        <h1> Hello, world! </h1>
      </div>
    )
  }
}
