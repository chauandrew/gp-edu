import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {Container, Row, Col, Image, ResponsiveEmbed} from 'react-bootstrap'

import Loading from '../../components/Loading/Loading'
import getVideoId from 'get-video-id';

import './Lessons.css'
import api from '../../utils/api'
import createToast from '../../utils/toast'

const Lessons = ({currentUser}) => {
    const {lessonId} = useParams();
    const [currLesson, setCurrLesson] = useState(null)
    const [chapterLessons, setChapterLessons] = useState([])
    const [videoUrl, setVideoUrl] = useState(null)
    const [course, setCourse] = useState(null)

    useEffect(() => {
        try {
            if (lessonId) {
                api.getRelatedLessons(lessonId).then((lessons) => {
                    setChapterLessons(lessons.data)
                    for (let i in lessons.data) {
                        if (lessons.data[i].lesson_id == lessonId) {
                            setCurrLesson(lessons.data[i])
                        }
                    }
                })
            }
        } catch (err) {
            createToast(err)
        }
    }, [lessonId])

    useEffect(() => {
        try {
            if (currLesson) {
                // get the current course
                api.getCourse(currLesson.course_id).then(res => {
                    if (res.data.length != 0) {
                        setCourse(res.data[0])
                    }
                })
                // get video id / url
                let videoId = getVideoId(currLesson.content_url)
                setVideoUrl("https://www.youtube.com/embed/" + videoId.id)
            }
        } catch (err) {
            createToast(err)
        }
    }, [currLesson])

    if (!currLesson) {
        return <Loading active={Boolean(currLesson)} />
    }

    return <div className="page-content lesson-content">
        <Container>
            <Row className="text-center mt-3 mb-3">
                <Col>
                    <h4>{course ? course.course_name : ""}</h4>
                    <h2>{currLesson ? currLesson.lesson_name : ""}</h2>
                    <p>{currLesson? currLesson.description : ""}</p>
                </Col>
            </Row>
            <Row className="text-center">
                <Col lg={3}>
                    <Image src="https://via.placeholder.com/100x250" />
                </Col>
                <Col lg={6} className="align-middle">
                    <ResponsiveEmbed aspectRatio="16by9">
                        <embed src={videoUrl} />
                    </ResponsiveEmbed>
                </Col>
                <Col lg={3}>
                    <Image src="https://via.placeholder.com/100x250" />
                </Col>
            </Row>
        </Container>
    </div>
}

export default Lessons