import React from 'react';
import HeroImage from '../../components/HeroImage/HeroImage';
import * as Placeholders from '../../assets/placeholders';
import './Homepage.css';

const Homepage = ({history}) => {
  return (
    <div className="page-content"> 
      <HeroImage value="Welcome to Gracepoint Education!" src={Placeholders.wide}/>
      
    </div>
  );
}

export default Homepage;
