import React from 'react';
import c101Banner from '../../assets/c101.png';
import './Browse.css';

const Browse = () => {
    return (
        <div className="page-content">
            <img className="c101-banner" src={c101Banner} alt="Course 101 Banner" />
            <div className="container">
                
                <div className="c101-intro">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <p>Et tortor consequat id porta nibh venenatis cras sed. Turpis massa tincidunt dui ut ornare lectus sit amet est. Massa ultricies mi quis hendrerit dolor magna eget est. Faucibus et molestie ac feugiat. Congue nisi vitae suscipit tellus mauris a diam maecenas. Volutpat est velit egestas dui id ornare arcu odio ut. Sodales neque sodales ut etiam sit amet. Ut pharetra sit amet aliquam id diam maecenas ultricies mi. At imperdiet dui accumsan sit amet nulla facilisi morbi tempus. Magna fermentum iaculis eu non diam.</p>
                    <img id="c101-vid" src="https://redeeminggod.com/wp-content/uploads/2015/10/truth-bible.jpg" alt="Oops"/> 
                </div>
                
                <div className="c101-info">
                    <div className="c101-info-sub" id="101-info-left">
                        <p>Course 101, a seven-week course developed by{'\u00A0'}
                        <a href="https://www.gracepointonline.org/">Gracepoint Ministries</a>, gives an
                        intellectual basis for answers to some of the most commonly asked questions about
                        the Christian faith and addresses misconceptions about God, Jesus and the Bible.
                        Both those who have experience with Christianity and those just beginning to consider it
                        will have the chance to explore how Christianity addresses questions about the
                       meaning of life, our purpose and the longings of our hearts.</p>
                    </div>
                    <div className="c101-info-sub" id="c101-info-right">
                       <h2>The Seven Chapters</h2>
                       <ul>
                           <li><a href="http://www.course101.org/chapter-1">Chapter 1 - What is Life?</a></li>
                           <li><a href="http://www.course101.org/chapter-2">Chapter 2 - A Good Thing Gone Bad</a></li>
                           <li><a href="http://www.course101.org/chapter-3">Chapter 3 - God's Revelation</a></li>
                           <li><a href="http://www.course101.org/chapter-4">Chapter 4 - Our Problem</a></li>
                           <li><a href="http://www.course101.org/chapter-5">Chapter 5 - Death and Resurrection of Jesus</a></li>
                           <li><a href="http://www.course101.org/chapter-6">Chapter 6 - Our Response</a></li>
                           <li><a href="http://www.course101.org/chapter-7">Chapter 7 - New Life of Love</a></li>
                       </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Browse;