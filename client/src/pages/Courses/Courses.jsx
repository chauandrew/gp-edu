import React, { Component } from 'react';
import CardColumns from 'react-bootstrap/CardColumns';
import Container from 'react-bootstrap/Container';
import StoryCard from '../../components/StoryCard/StoryCard';
import HeroImage from '../../components/HeroImage/HeroImage';

import * as Placeholders from '../../assets/placeholders';
import Config from '../../config/our-story.json';
import './Courses.css';

class Courses extends Component {
    
    render() {
        let assets = require.context('../../assets', true);
        let cards = Config.stories.map((story, idx) => {
            let imgsrc = assets('./' + story.img);
            return (
                <StoryCard title={story.author} value={story.body} src={imgsrc} key={idx} />
            );
        });

        return (
            <div>
                <HeroImage value="OUR STORY" src={Placeholders.standard}/>
                <Container fluid className="card-container">
                    <CardColumns>
                        {cards}
                    </CardColumns>
                </Container>
            </div>
        );
    }
}

export default Courses;