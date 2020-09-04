import React from 'react';
import './Homepage.css';
import books from '../../assets/homepage-assets/books.png'
import math from '../../assets/homepage-assets/math.png'
import pencilLight from '../../assets/homepage-assets/pencil-light.png'
import programming from '../../assets/homepage-assets/programming.png'
import science from '../../assets/homepage-assets/science.png'
import yellowBanner from '../../assets/homepage-assets/YellowBanner.png'
import robot from '../../assets/homepage-assets/Robot.png'

const Homepage = ({history}) => {
  return (
    <div className="page-content">
      <div className="typewriter">
        <h1 className="welcome" style = {{left: 100, top: 115}}>
          HI THERE. WELCOME!
        </h1>
      </div>
      <div className="typewriter2">
        <h2 className= "click" style = {{left:100, top: 180}}>
          Click on a subject to get started!
        </h2>
      </div>
      
        <a href="/subjects/humanities">
        <img src={books} alt = "books" id="image" className="books"/>
        </a>
        <a href="/subjects/math">
        <img src={math} alt = "math" id="image" className="math"/>
        </a>
        <a href="/subjects/life skills">
        <img src={pencilLight} alt = "pencil-light" id="image" className="pencilLight"/>
        </a>
        <a href="/subjects/computer science">
        <img src={programming} alt = "programming" id="image" className="programming"/>
        </a>
        <a href="/subjects/science">
        <img src={science} alt = "science" id="image" className="science"/>
        </a>

        <img src={yellowBanner} alt = "yellow banner" id="image" className="yellowBanner"/>
        <img src={robot} alt = "robott" id="image" className="robot"/>
    </div>
  );
}

export default Homepage;
