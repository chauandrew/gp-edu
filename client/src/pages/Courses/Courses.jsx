import React from 'react';
import CardColumns from 'react-bootstrap/CardColumns';
import Container from 'react-bootstrap/Container';
import StoryCard from '../../components/StoryCard/StoryCard';
import HeroImage from '../../components/HeroImage/HeroImage';
import api from '../../utils/api';

import * as Placeholders from '../../assets/placeholders';
import Config from '../../config/our-story.json';
import './Courses.css';

const Courses = ({ currentUser }) => {
    const assets = require.context('../../assets', true);
    const cards = Config.stories.map((story, idx) => {
        const imgsrc = assets('./' + story.img);
        return (
            <StoryCard title={story.author} value={story.body} src={imgsrc} key={idx} />
        );
    });

    api.getAllSubjects().then((d => console.log(d)))
    return (
        <div className="page-content">
            <HeroImage value="OUR STORY" src={Placeholders.standard} />
            <Container fluid className="card-container">
                <CardColumns>
                    {cards}
                </CardColumns>
            </Container>
            <p>
            </p>
        </div>
    );
}

export default Courses;