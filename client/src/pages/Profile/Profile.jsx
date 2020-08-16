import React from 'react';
import profilepic from '../../assets/profilepicpanda.png';
import './Profile.css';

const Profile = ({ currentUser }) => {
    const displayName = currentUser ? currentUser.firstname : "Loading"
    return (
      <div className="page-content">
        <div id="banner">
          <div id="profile">
            <img src={profilepic} alt="profilepic" className="avatar"/>
            <h1 id="profiletext">Hi, {displayName}</h1>
          </div>
          <p></p>
        </div>
      </div>
    );
}

export default Profile;