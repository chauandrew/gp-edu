import React from 'react'
import './About.css'

const About = () => {
    return (
        <div className="page-content">
            <h1 style = {{fontSize: "40px", position: 'absolute', left: 299.82, top: 79.56, fontWeight: "bold", fontFamily: "DM Sans"}}>
                ABOUT US
            </h1>
            <h2 style = {{fontSize: "20px", position: 'absolute', left: 371.93, top: 187.12, fontWeight: "bold", fontFamily: "DM Sans"}}>
                WHO WE ARE
            </h2>
            <p style = {{fontSize: "16px", position: "absolute", left: 370.38, top: 243.28, fontFamily: "Helvetica Neue"}}>
                We are a cool group of people called Area Youth Ministries. We care about educational equality and growth for are youth, especially in underserved areas.
            </p>
        </div>
    )
}

export default About
