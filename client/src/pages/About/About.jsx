import React from 'react'
import './About.css'
import '../../App.css'
import flowers3 from '../../assets/about_assets/Flowers3.png'
import flowers2 from '../../assets/about_assets/Flowers2.png'
import treesBig from '../../assets/about_assets/TreesBig.png'
import treesSmall from '../../assets/about_assets/TreesSmall.png'
import ladyLaptop from '../../assets/about_assets/LadyLaptop.png'
import manLaptop from '../../assets/about_assets/ManLaptop.png'

const About = () => {
    return (
        <div className="page-content">
            <img src={flowers3} alt = "three flowers" id="image" className="flowers3"/>
            <img src={flowers2} alt = "two flowers" id="image" className="flowers2"/>
            <img src={treesBig} alt = "big trees" id="image" className="bigTrees"/>
            <img src={treesSmall} alt = "small trees" id="image" className="smallTrees"/>
            <img src={ladyLaptop} alt = "lady laptop" id="image" className="ladyLaptop"/>
            <img src={manLaptop} alt = "man laptop" id="image" className="manLaptop"/>

            <h1 className="about-style" style = {{left: 262, top: 130}}>
                ABOUT US
            </h1>

            <h2 id="title" className="about-style" style = {{left: 330, top: 205}}>
                WHO WE ARE
            </h2>
                <p id="description" className="about-style" style = {{left: 330, top: 240}}>
                    We are a cool group of people called
                    Area Youth Ministries. We care about
                    educational equality and growth for our
                    youth, especially in undeserved areas.
                </p>
            <h2 id="title" className="about-style" style = {{left: 330, top: 345}}>
                OUR MISSION
            </h2>
                <p id="description" className="about-style" style = {{left: 330, top: 380}}>
                    Our mission is to inspire and educate
                    the next generation of young learners
                    and help them realize their potential
                    to change the world.
                </p>
             <h2 id="title" className="about-style" style = {{left: 330, top: 490}}>
                INTERACTIVE EDUCATION
            </h2>
                <p id="description" className="about-style" style = {{left: 330, top: 525}}>
                    This platform offers a wide variety of
                    interactive courses in mathematics,
                    science, humanities, programming,
                    and life skills.
                </p>
            <h2 id="title" className="about-style" style = {{left: 830, top: 205}}>
                COLLABORATION
            </h2>
                <p id="description" className="about-style" style = {{left: 830, top: 250}}>
                    Meet classmates from your courses.
                    Ask or answer questions on course
                    forums – anytime and anywhere.
                </p>
            <h2 id="title" className="about-style" style = {{left: 830, top: 345}}>
                ACHIEVABLE GOALS
            </h2>
                <p id="description" className="about-style" style = {{left: 830, top: 380}}>
                    Earn badges as you complete course
                    milestones. You can easily check your
                    course progress and see how far you
                    have come since the beginning.
                </p>
        </div>
    )
}

export default About
