import React from 'react';
import profilepic from '../../assets/profilepicpanda.png';
import './Homepage.css';

const Homepage = ({currentUser, history, match}) => {
  const displayName = currentUser ? currentUser.firstName : "Loading"
  return (
    <>
      <div id="banner" className="page-content">
        <div id="profile">
          <img src={profilepic} alt="profilepic" className="avatar"/>
          <h1 id="profiletext">Hi, {displayName}</h1>
        </div>
        <p></p>
      </div>
    </>
  );
}

export default Homepage;
