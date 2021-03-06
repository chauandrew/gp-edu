import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import YouTube from 'react-youtube'

import Loading from '../../components/Loading/Loading'
import getVideoId from 'get-video-id';

import './Lessons.css'
import api from '../../utils/api'
import theme from '../../utils/theme'
import createToast from '../../utils/toast'
import StatusIds from '../../config/statusIds.json'

const Lessons = ({ currentUser }) => {
    const { lessonId } = useParams();
    const [currLesson, setCurrLesson] = useState(null)
    const [chapterLessons, setChapterLessons] = useState([])
    const [videoId, setVideoId] = useState(null)
    const [course, setCourse] = useState(null)
    const [comments, setComments] = useState([])
    const [commentElements, setCommentElements] = useState([])

    // Get chapters related to current lesson
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

    
    // Load video id from db to embed
    useEffect(() => {
        try {
            if (currLesson) {
                // set theme colors
                theme.setCssColorsByCourseId(currLesson.course_id)
                // get the current course
                api.getCourse(currLesson.course_id).then(res => {
                    if (res.data.length != 0) {
                        setCourse(res.data[0])
                    }
                })
                // get video id
                let videoDetails = getVideoId(currLesson.content_url)
                setVideoId(videoDetails.id)
            }
        } catch (err) {
            createToast(err)
        }
    }, [currLesson])

    // Get lesson comments from api, updating state on changes
    const updateComments = async () => {
        api.getCommentsByLessonId(lessonId).then((c) => {
            if (comments.length != c.data.length ) {
                setComments(...[c.data])
            } else {
                setTimeout(updateComments, 300)
            }
        })
    }

    useEffect(() => {
        try { 
            if (lessonId && currentUser) { 
                updateComments()
            }
        } catch (err) { createToast(err) }
    }, [lessonId, currentUser])

    // Create comment elements
    useEffect(() => {
        let elements = []
        for (let i in comments) {
            let curr = comments[i]
            let deleteComment = null
            // if comment written by user or user is admin, add 'Remove Comment' button
            if (curr.user_id == currentUser.id || currentUser.is_admin) {
                deleteComment = <Button variant="link" size="sm" value={curr.id} className="float-right" key={curr.id}
                    onClick={e => {api.removeComment(e.target.value).then(updateComments()) }}>Remove Comment</Button>
            }
            elements.push(
                <Row className="p-3 comment" key={curr.id}>
                    <h6 className="text-secondary text-left">
                        {`${curr.firstname.toUpperCase()} ${curr.lastname[0].toUpperCase()}.`}</h6>
                    <p className="text-left mb-0">{curr.body}</p>
                    {deleteComment}
                </Row>
            )
        }
        setCommentElements(elements)
    }, [comments])

    // Handlers to mark lessons as 'in progress or completed'
    const beginLesson = async () => {
        if (lessonId) {
            api.setLessonStatus(lessonId, StatusIds['USER_PROGRESS_STATUS']['IN_PROGRESS'])
        }
    }
    const finishLesson = async () => {
        if (lessonId) {
            api.setLessonStatus(lessonId, StatusIds['USER_PROGRESS_STATUS']['COMPLETED'])
        }
    }

    // handler to add a comment
    const handleAddComment = async (ev) => {
        ev.preventDefault()
        const {commentBody} = ev.target.elements
        if (!commentBody.value) {
            createToast("Cannot leave a blank comment")
        } else if (commentBody.value.length > 255) {
            createToast("Comment length must be less than 255 characters")
        }
        api.addComment(lessonId, commentBody.value)
            .then(() => updateComments() )
            .catch(err => createToast(err))
    }


    if (!currLesson) {
        return <Loading active={Boolean(currLesson)} />
    }

    return <div className="page-content theme-bg-color">
        <Container>
            <Row className="text-center mt-3 mb-3">
                <Col>
                    <h4>{course ? course.course_name : ""}</h4>
                    <h2>{currLesson ? currLesson.lesson_name : ""}</h2>
                    <p>{currLesson ? currLesson.description : ""}</p>
                </Col>
            </Row>
            <Row className="text-center">
                <Col lg={8} className="align-middle">
                    <YouTube className="" videoId={videoId} onPlay={beginLesson} onEnd={finishLesson} />
                </Col>
                <Col lg={4} className="theme-bg-light border border-dark rounded-lg">
                    <Row className="justify-content-center p-3"><h4>Course Forum</h4></Row>
                    {commentElements}
                    <Row className="p-3 mt-5 d-block">
                        <Form className="w-100 text-left" onSubmit={handleAddComment}>
                            <Form.Group controlId="commentBody" className="mb-0">
                                <Form.Control as="textarea" rows="3" placeholder="Add your own comment!" />
                                <Form.Text className="text-muted">Up to 255 characters</Form.Text>
                            </Form.Group>
                            <Button className="float-right" variant="link" size="sm" type="submit">Post Comment</Button>
                        </Form>
                    </Row>
                </Col>
            </Row>
        </Container>
    </div>
}

export default Lessons