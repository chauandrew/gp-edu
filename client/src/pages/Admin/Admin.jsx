import React, {useEffect, useState} from 'react';
import {Button, Modal, Form} from 'react-bootstrap'
import './Admin.css';
import Loading from '../../components/Loading/Loading'
import api from '../../utils/api'
import createToast from '../../utils/toast'

const Admin = ({ currentUser }) => {
    // show/hide modals
    const [courseModalState, setCourseModalState] = useState(false)
    const [chapterModalState, setChapterModalState] = useState(false)
    const [lessonModalState, setLessonModalState] = useState(false)
    
    // populate subjects / courses in forms
    const [subjects, setSubjects] = useState(null) 
    const [selectedSubjectId, setSelectedSubjectId] = useState(null)
    const [courses, setCourses] = useState(null) 
    const [selectedCourseId, setSelectedCourseId] = useState(null)
    const [chapters, setChapters] = useState(null)

    // handlers to show/hide modals
    const closeCourseModal = () => {setCourseModalState(false)}
    const showCourseModal = () => {setCourseModalState(true)}
    const closeChapterModal = () => {setChapterModalState(false)}
    const showChapterModal = () => {setChapterModalState(true)}
    const closeLessonModal = () => {setLessonModalState(false)}
    const showLessonModal = () => {setLessonModalState(true)}

    // function handlers to send API requests to create 
    const handleCreateCourse =  async (ev) => {
        ev.preventDefault() // don't reload page
        const {subjectId, courseName} = ev.target.elements
        if (!subjectId.value || !parseInt(subjectId.value)) {
            createToast("You must select a subject")
            return
        } else if (!courseName.value) {
            createToast("You must fill out the course name")
            return
        }

        api.createCourse(subjectId.value, courseName.value, null)
            .then(() => {
                closeCourseModal()
                createToast("Course successfully created!")
            }).catch( (err) => createToast(err) )
    }

    const handleCreateChapter = async (ev) => {
        ev.preventDefault() // don't reload page
        const {courseId, chapterName, chapterDescription} = ev.target.elements
        if (!courseId.value || !parseInt(courseId.value)) {
            createToast("You must select a course")
            return
        } else if (!chapterName.value || chapterName.value.length > 255) {
            createToast("You must write a chapter name (up to 255 chars)")
            return
        } else if (!chapterDescription.value || chapterDescription.value.length > 255) {
            createToast("Please write a description for your chapter (up to 255 chars)")
            return
        }

        api.createChapter(courseId.value, chapterName.value, null, chapterDescription.value)
            .then(() => {
                closeChapterModal()
                createToast("Chapter successfully created!")
            }).catch((err) => createToast(err))
    }

    const handleCreateLesson = async (ev) => {
        ev.preventDefault() // don't reload page
        const {chapterId, lessonCourseId, lessonName, lessonDescription, contentUrl} = ev.target.elements
        if (!lessonCourseId.value || !parseInt(lessonCourseId.value)) {
            createToast("You must select a course!")
            return
        } else if (chapterId.value && !parseInt(chapterId.value)) {
            createToast("chapter value must be an integer")
            return
        } else if (!lessonName.value || lessonName.value.length > 63) {
            createToast("You must name your lesson (up to 63 chars)")
            return;
        } else if (!lessonDescription.value || lessonDescription.value.length > 255) {
            createToast("You must add a description to the lesson! (up to 255 chars)")
            return
        } else if (!contentUrl.value || contentUrl.value.length > 255) {
            createToast("You must enter a valid URL (up to 255 chars)")
            return
        }

        api.createLesson(chapterId.value, lessonCourseId.value, lessonName.value, 
            null, contentUrl.value, lessonDescription.value)
            .then(()=> {
                closeLessonModal()
                createToast("Successfully created lesson!")
            }).catch((err) => createToast(err))
    }

    // Get all available subjects
    useEffect(() => {
        api.getAllSubjects().then((res) => {
            setSubjects(res.data) })
    }, [])
    var subjectOptions = [<option value="" key="">Choose...</option>]
    if (subjects) {
        for (let i in subjects) {
            let subjectName = subjects[i].subject_name
            subjectOptions.push(<option value={subjects[i].id}
                                    key={subjectName}>{subjectName}</option>)
        }
    }

    // Get courses by selected subject
    useEffect(() => {
        if (subjects && selectedSubjectId) {
            api.getCoursesBySubject(selectedSubjectId).then((res) => {
                setCourses(res.data) })
        }
    }, [selectedSubjectId])
    var courseOptions = [<option value="" key="">Choose...</option>]
    if (courses) {
        for (let i in courses) {
            courseOptions.push(<option value={courses[i].id} 
                key={courses[i].id}>{courses[i].course_name}</option>)
        }
    }

    // get chapters by selected course
    useEffect(() => {
        if (courses && selectedCourseId) {
            api.getChaptersByCourseId(selectedCourseId).then((res) => {
                setChapters(res.data)
            })
        }
    }, [selectedCourseId])
    var chapterOptions = [<option value="" key="">None</option>]
    if (chapters) {
        for (let i in chapters) {
            chapterOptions.push(<option value={chapters[i].id}
                key={chapters[i].id}>{chapters[i].chapter_name}</option>)
        }
    }

    // Only admin is allowed to access this page
    if (!currentUser) {
        return <Loading active={!currentUser} />
    }
    if (!currentUser.is_admin) {
        createToast("You must be an admin to access this page!")
        window.location.href="/"
    }

    return (
        <div className="page-content container">
            {/* Modal buttons */}
            <div className="m-3">
                <Button variant="primary" onClick={showCourseModal}>
                    Create a new course
                </Button>
            </div>
            <div className="m-3">
                <Button variant="primary" onClick={showChapterModal}>
                    Create a new chapter
                </Button>
            </div>
            <div className="m-3">
                <Button variant="primary" onClick={showLessonModal}>
                    Create a new lesson
                </Button>
            </div>

            {/* Create new course modal */}
            <Modal show={courseModalState} onHide={closeCourseModal}>
                <Modal.Header closeButton>New Course:</Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleCreateCourse}>
                        <Form.Group controlId="subjectId">
                            <Form.Label>Subject</Form.Label>
                            <Form.Control as="select">{subjectOptions}</Form.Control>
                        </Form.Group>
                        <Form.Group controlId="courseName">
                            <Form.Label>Course Name</Form.Label>
                            <Form.Control placeholder="Algebra 2" />
                        </Form.Group>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Modal to create new chapter */}
            <Modal show={chapterModalState} onHide={closeChapterModal}>
                <Modal.Header closeButton>New Chapter:</Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleCreateChapter}>
                        <Form.Group>
                            <Form.Label>Subject</Form.Label>
                            <Form.Control as="select" 
                                onChange={(ev) => setSelectedSubjectId(ev.target.value)}>
                                {subjectOptions}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="courseId">
                            <Form.Label>Course</Form.Label>
                            <Form.Control as="select">{courseOptions}</Form.Control>
                        </Form.Group>
                        <Form.Group controlId="chapterName">
                            <Form.Label>Chapter Name</Form.Label>
                            <Form.Control Placeholder="Mitochondria" />
                        </Form.Group>
                        <Form.Group controlId="chapterDescription">
                            <Form.Label>Chapter Description</Form.Label>
                            <Form.Control as="textarea" Placeholder="This chapter covers..." />
                        </Form.Group>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Modal to create a new lesson */}
            <Modal show={lessonModalState} onHide={closeLessonModal}>
                <Modal.Header closeButton>New Lesson:</Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleCreateLesson}>
                        <Form.Group>
                            <Form.Label>Subject</Form.Label>
                            <Form.Control as="select" 
                                onChange={(ev) => setSelectedSubjectId(ev.target.value)}>
                                {subjectOptions}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="lessonCourseId">
                            <Form.Label>Course</Form.Label>
                            <Form.Control as="select" 
                                onChange={(ev) => setSelectedCourseId(ev.target.value)}>
                                {courseOptions}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="chapterId">
                            <Form.Label>Chapter</Form.Label>
                            <Form.Control as="select">{chapterOptions}</Form.Control>
                            <Form.Text className="text-muted">
                                If no chapter is selected, this will be created as a standalone lesson.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="lessonName">
                            <Form.Label>Lesson Name</Form.Label>
                            <Form.Control Placeholder="Intro to Photoshop"/>
                        </Form.Group>
                        <Form.Group controlId="lessonDescription">
                            <Form.Label>Lesson Description</Form.Label>
                            <Form.Control as="textarea" Placeholder="This lesson will teach you..." />
                        </Form.Group>
                        <Form.Group controlId="contentUrl">
                            <Form.Label>Link to Content</Form.Label>
                            <Form.Control Placeholder="https://youtube.com/..." />
                        </Form.Group>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Modal.Body>
            </Modal>
            
        </div>
    );
}

export default Admin;