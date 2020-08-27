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
            <h2 style = {{fontSize: "18px", position: 'absolute', left: 320, top: 200, fontWeight: "bold", fontFamily: "DM Sans"}}>
                WHO WE ARE
            </h2>
            <p style = {{fontSize: "12px", position: "absolute", left: 315, top: 230, fontFamily: "Helvetica Neue"}}>
                We are a cool group of people called Area Youth Ministries. We care about educational equality and growth for are youth, especially in underserved areas.
            </p>
        </div>
    )
}

export default About
