import React from 'react';
import './Homepage.css';
import yellowBanner from '../../assets/YellowBanner.png'
import eduIcons from '../../assets/EducationImages.png'
import robot from '../../assets/Robot.png'

const Homepage = ({history}) => {
  return (
    <div className="page-content"> 
      <h1 className="welcome" style = {{left: 100, top: 115}}>
        HI THERE. WELCOME!
      </h1>
      <h2 className= "click" style = {{left:100, top: 180}}>
        Click on a subject to get started!
      </h2>
      
      <img src={yellowBanner} alt = "yellow banner" id="image" className="yellowBanner"/>
    </div>
  );
}

export default Homepage;
