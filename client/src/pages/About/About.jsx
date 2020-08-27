import React from 'react'
import './About.css'

const About = () => {
    return (
        <div className="page-content">
            <h1 style = {{fontSize: "40px", position: 'absolute', left: 283.59, top: 89.64, fontWeight: "bold", fontFamily: "DM Sans"}}>
                ABOUT US
            </h1>
            <p style = {{fontSize: "16px", position: "absolute", left: 317.71, top: 111.75, fontFamily: "Helvetica Neue"}}>
                We are a cool group of people called Area Youth Ministries. We care about educational equality and growth for are youth, especially in underserved areas.
            </p>
        </div>
    )
}

export default About
