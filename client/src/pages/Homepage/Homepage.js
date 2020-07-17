import React, { Component } from 'react';
import './Homepage.css';

class Homepage extends Component {
  render() {
    return (
      <div className="page-content">
        <div className="container-fluid parallax">
          <div className="text-center">
            <h1>I am John Doe</h1>
            <p>And I'm a Photographer</p>
          </div>
        </div>

      </div>
    );
  }
}

export default Homepage;
