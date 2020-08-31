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
    const [selectedCourse, setSelectedCourse] = useState(null)
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
        const {courseId, chapterName} = ev.target.elements
        if (!courseId.value || !parseInt(courseId.value)) {
            createToast("You must select a course")
            return
        } else if (!chapterName.value) {
            createToast("You must write a chapter name")
            return
        }

        api.createChapter(courseId.value, chapterName.value, null)
            .then(() => {
                closeChapterModal()
                createToast("Chapter successfully created!")
            }).catch((err) => createToast(err))
    }

    const handleCreateLesson = async (ev) => {
        ev.preventDefault() // don't reload page
        closeLessonModal()
        createToast("creating a lesson!")
    }

    // Get all available subjects
    useEffect(() => {
        api.getAllSubjects().then((res) => {
            setSubjects(res.data) })
    }, [])
    var subjectOptions = [<option value="" key="">Choose...</option>]
    if (subjects) {
        for (let subject in subjects) {
            subjectOptions.push(<option value={subjects[subject][0].subject_id}
                                    key={subject}>{subject}</option>)
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

    // TODO: get chapters by selected course


    if (!currentUser) {
        return <Loading active={!currentUser} />
    }
    if (!currentUser.is_admin) {
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
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <Modal show={lessonModalState} onHide={closeLessonModal}>
                <Modal.Header closeButton>New Lesson:</Modal.Header>
            </Modal>
            
        </div>
    );
}

export default Admin;