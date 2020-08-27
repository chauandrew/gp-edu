import React from 'react'
import './About.css'

const About = () => {
    return (
        <style>
            @import url('https://fonts.googleapis.com/css2?family=DM+Sans&display=swap');
        </style>
        <div className="page-content">
            <h1 style = {{fontSize: "40px", position: 'absolute', left: 299.82, top: 167.06, fontWeight: "bold", fontFamily: "DM Sans"}}>
                ABOUT US
            </h1>
            <h2 style = {{fontSize: "20px", position: 'absolute', left: 371.93, top: 274.62, fontWeight: "bold", fontFamily: "DM Sans"}}>
                WHO WE ARE
            </h2>
            <p style = {{fontSize: "16px", position: "absolute", left: 370.38, top: 330.78, fontFamily: "Helvetica Neue"}}>
                We are a cool group of people called Area Youth Ministries. We care about educational equality and growth for are youth, especially in underserved areas.
            </p>
        </div>
    )
}

export default About
