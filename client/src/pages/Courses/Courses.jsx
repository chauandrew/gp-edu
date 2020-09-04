import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'
import {CardColumns, Container, Row, Col, Form, Button, Image} from 'react-bootstrap'
import StoryCard from '../../components/StoryCard/StoryCard';

import 'get-video-id'
import api from '../../utils/api';
import createToast from '../../utils/toast';

import * as Placeholders from '../../assets/placeholders';
import * as Robots from '../../assets/courses'
import './Courses.css';
import getVideoId from 'get-video-id';

const Courses = ({ currentUser }) => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null)
    const [chapters, setChapters] = useState([]);

    useEffect(() => {
        if (courseId) {
            // load lessons related to this course
            api.getCourseOverview(courseId)
                .then(async (res) => {
                    for (let i in res.data) {
                        if (res.data[i].content_url) {
                            // get videoId of youtube links
                            res.data[i].videoId = await getVideoId(res.data[i].content_url).id
                        }
                    }
                    setChapters(res.data);
                })
                .catch(err => createToast(err))
            // get course info
            api.getCourse(courseId)
                .then(res => {
                    if (res.data && res.data.length != 0) {
                        setCourse(res.data[0])
                    }
                }).catch(err => createToast(err))
        }
    }, [courseId])

    // Load each Course Card
    var chapterElem = []
    if (chapters) {
        for (let i in chapters) {
            let src = Placeholders.standard
            // If there's a contentUrl, use it's thumbnail
            if (chapters[i].videoId) {
                src=`https://img.youtube.com/vi/${chapters[i].videoId}/hqdefault.jpg`
            }
            chapterElem.push(<StoryCard title={chapters[i].lesson_name} 
                key={i} src={src} 
                description={chapters[i].description}/>)
        }
    }

    return (
        <div className="page-content course-bkgd">
            <Container>
                <Row className="m-auto">
                    <div className="m-3">
                        <h2 className="text-light">{course ? course.course_name.toUpperCase() : ""}</h2>
                    </div>
                    <Form inline className="m-3">
                        <Form.Control type="text" placeholder="Search" className="mr-sm-2" />
                    </Form>
                </Row>
                <Row className="m-auto">
                    <Col md={9}>
                        <CardColumns>
                            {chapterElem}
                        </CardColumns>
                    </Col>
                    <Col>
                        <Image src={Robots.chat} alt="chat"></Image>
                        <Image src={Robots.vertical} alt="robot"></Image>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Courses;