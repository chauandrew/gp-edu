import React from 'react';
import './Homepage.css';

const Homepage = ({history}) => {
  return (
    <div className="page-content"> 
      <h1 className="welcome" style = {{left: 100, top: 115}}>
        HI THERE. WELCOME!
      </h1>
      <h2 className= "click" style = {{left:100, top: 170}}>
        Click on a subject to get started!
      </h2>
    </div>
  );
}

export default Homepage;
