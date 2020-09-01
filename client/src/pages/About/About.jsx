import React from 'react'
import './About.css'
import flowers3 from '../../assets/Flowers3.png'
import flowers2 from '../../assets/Flowers2.png'
import treesBig from '../../assets/TreesBig.png'
import treesSmall from '../../assets/TreesSmall.png'
import ladyLaptop from '../../assets/LadyLaptop.png'
import manLaptop from '../../assets/ManLaptop.png'

const About = () => {
    return (
        <div className="page-content">
            <img src={flowers3} alt = "three flowers" 
                style = {{position: 'relative', left: 260, top: 113, height: '3.187%', width: '3.187%'}}
            />
            <img src={flowers2} alt = "two flowers"
                style = {{position: 'relative', left: 715, top: 45, height: '3.187%', width: '3.187%'}}
            />
            <img src={treesBig} alt = "big trees"
                style = {{position: 'relative', left: 565, top: 370, height: '12%', width: '12%'}}
            />
            <img src={treesSmall} alt = "small trees"
                style = {{position: 'relative', left: 1000, top: 388, height: '9%', width: '9%'}}
            />
            <img src={ladyLaptop} alt = "lady laptop"
                style = {{position: 'relative', left: 490, top: 310, height: '9.1%', width: '9.1%'}}
            />
            <img src={manLaptop} alt = "man laptop"
                style = {{position: 'relative', left: 505, top: 291, height: '12%', width: '12%'}}
            />
            <style>
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans&display=swap');
            </style>
            <h1 style = {{fontSize: "35px", position: 'absolute', left: 262, top: 130, fontWeight: "bold", fontFamily: "DM Sans", letterSpacing: "0.07em"}}>
                ABOUT US
            </h1>
            <h2 style = {{fontSize: "18px", position: 'absolute', left: 330, top: 205, fontWeight: "bold", fontFamily: "DM Sans", letterSpacing: "0.07em"}}>
                WHO WE ARE
            </h2>
            <p style = {{fontSize: "12px", position: "absolute", left: 328, top: 242, fontFamily: "Helvetica Neue", letterSpacing: "0.07em", lineHeight: "169.5%"}}>
                We are a cool group of people called <br /> Area Youth Ministries. We care about <br /> educational equality and growth for are <br /> youth, especially in underserved areas.
            </p>
            <h2 style = {{fontSize: "18px", position: 'absolute', left: 330, top: 339, fontWeight: "bold", fontFamily: "DM Sans", letterSpacing: "0.07em"}}>
                OUR MISSION
            </h2>
            <p style = {{fontSize: "12px", position: "absolute", left: 328, top: 376, fontFamily: "Helvetica Neue", letterSpacing: "0.07em", lineHeight: "169.5%"}}>
                Our mission is to inspire and educate <br /> the next generation of young learners <br /> and help them realize their potential <br /> to change the world.
            </p>
             <h2 style = {{fontSize: "18px", position: 'absolute', left: 330, top: 473, fontWeight: "bold", fontFamily: "DM Sans", letterSpacing: "0.07em"}}>
                INTERACTIVE EDUCATION
            </h2>
            <p style = {{fontSize: "12px", position: "absolute", left: 328, top: 510, fontFamily: "Helvetica Neue", letterSpacing: "0.07em", lineHeight: "169.5%"}}>
                This platform offers a wide variety of <br /> interactive courses in mathematics, <br /> science, humanities, programming, <br /> and life skills.
            </p>
            <h2 style = {{fontSize: "18px", position: 'absolute', left: 830, top: 205, fontWeight: "bold", fontFamily: "DM Sans", letterSpacing: "0.07em"}}>
                COLLABORATION
            </h2>
            <p style = {{fontSize: "12px", position: "absolute", left: 828, top: 250, fontFamily: "Helvetica Neue", letterSpacing: "0.07em", lineHeight: "169.5%"}}>
                Meet classmates from your courses. <br /> Ask or answer questions on course <br /> forums – anytime and anywhere.
            </p>
            <h2 style = {{fontSize: "18px", position: 'absolute', left: 830, top: 339, fontWeight: "bold", fontFamily: "DM Sans", letterSpacing: "0.07em"}}>
                ACHIEVABLE GOALS
            </h2>
            <p style = {{fontSize: "12px", position: "absolute", left: 828, top: 376, fontFamily: "Helvetica Neue", letterSpacing: "0.07em", lineHeight: "169.5%"}}>
                Earn badges as you complete course <br /> milestones. You can easily check your <br /> course progress and see how far you <br /> have come since the beginning.
            </p>
        </div>
    )
}

export default About
