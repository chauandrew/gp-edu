import React from 'react'
import './About.css'

const About = () => {
    return (
        <div className="page-content">
            <style>
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans&display=swap');
            </style>
            <h1 style = {{fontSize: "35px", position: 'absolute', left: 275, top: 150, fontWeight: "bold", fontFamily: "DM Sans"}}>
                ABOUT US
            </h1>
            <h2 style = {{fontSize: "18px", position: 'absolute', left: 330, top: 225, fontWeight: "bold", fontFamily: "DM Sans"}}>
                WHO WE ARE
            </h2>
            <p style = {{fontSize: "12px", position: "absolute", left: 327, top: 260, fontFamily: "Helvetica Neue"}}>
                We are a cool group of people called <br /> Area Youth Ministries. We care about <br /> educational equality and growth for are <br /> youth, especially in underserved areas.
            </p>
            <h2 style = {{fontSize: "18px", position: 'absolute', left: 330, top: 350, fontWeight: "bold", fontFamily: "DM Sans"}}>
                OUR MISSION
            </h2>
            <p style = {{fontSize: "12px", position: "absolute", left: 327, top: 385, fontFamily: "Helvetica Neue"}}>
                Our mission is to inspire and educate <br /> the next generation of young learners <br /> and help them realize their potential <br /> to change the world.
            </p>
        </div>
    )
}

export default About
