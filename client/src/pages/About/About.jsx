import React from 'react'
import './About.css'

const About = () => {
    return (
        <div className="page-content">
            <h1>About us</h1>

            {  /* -------------SECTIONS---------------- */ } 
           
            <div className="row">
            	<div className="column">
            		{ /* Copy section blocks below to add more */ }
		            <section>
			            <h3> Who We Are </h3>
			            	<p> We are a cool group of people called Area Youth Ministries. We care about educational equality and growth for our youth, especially in underprivileged areas.</p>
			        </section>

			        <section>
			        	<h3> Our Mission </h3>
			        		<p> Our mission is to inspire and educate the next generation of young learners and help them realize their potential to change the world!</p>
			        </section>

			        <section>
			        	<h3> Interactive Education </h3>
			        		<p>This platform offers a wide variety of interactive courses in mathematics, science, humanities, programming, and life skills.</p>
			        </section>
			    </div>

			    <div class="column">
			    	<section>
			            <h3> Collaboration </h3>
			            	<p> Meet classmates from your courses. Ask or answer questions on course forums - anytime and anywhere.</p>
			        </section>

			        <section>
			            <h3> Achievable Goals </h3>
			            	<p> Earn badges as you complete course milestones. You can easily check your course progress and see how far you have come since the beginning.</p>
			        </section>
			    </div>
			    
			</div>
	        
        </div>
    )
}

export default About