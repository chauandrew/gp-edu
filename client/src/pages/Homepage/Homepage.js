import React, { Component } from 'react';
import profilepic from '../../assets/profilepicpanda.png';
import './Homepage.css';

class Homepage extends Component {
  render() {
    return (
      <div>
        <div id="banner">
          <div id="profile">
            <img src={profilepic} alt="profilepic" class="avatar"/>
            <h1 id="profiletext">Hi, Sunny</h1>
          </div>
          <p></p>
        </div>
      </div>
    );
  }
}

export default Homepage;
