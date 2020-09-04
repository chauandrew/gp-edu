import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'
import {CardColumns, Container} from 'react-bootstrap'
import StoryCard from '../../components/StoryCard/StoryCard';
import api from '../../utils/api';
import createToast from '../../utils/toast';

import * as Placeholders from '../../assets/placeholders';
import Config from '../../config/our-story.json';
import './Courses.css';

const Courses = ({ currentUser }) => {
    const { courseId } = useParams();
    const [chapters, setChapters] = useState([]);

    useEffect(() => {
        if (courseId) {
            api.getChaptersByCourseId(courseId)
                .then(res => setChapters(res.data))
                .catch(err => createToast(err))
        }
    }, [courseId])

    const assets = require.context('../../assets', true);
    var chapterElem = []
    if (chapters) {
        for (let i in chapters) {
            chapterElem.push(<StoryCard title={chapters[i].chapter_name} 
                key={i} src={Placeholders.standard} />)
        }
    }

    return (
        <div className="page-content">
            <Container fluid className="card-container">
                <CardColumns>
                    {chapterElem}
                </CardColumns>
            </Container>
        </div>
    );
}

export default Courses;