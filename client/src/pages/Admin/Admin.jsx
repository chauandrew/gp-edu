import React, {useEffect, useState} from 'react';
import {Button, Modal, Form} from 'react-bootstrap'
import './Admin.css';
import Loading from '../../components/Loading/Loading'
import api from '../../utils/api'
import createToast from '../../utils/toast'

const Admin = ({ currentUser }) => {
    const [courseModalState, setCourseModalState] = useState(false)
    const [chapterModalState, setChapterModalState] = useState(false)
    const [lessonModalState, setLessonModalState] = useState(false)


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
            })
            .catch((err, x) => {console.log(x); createToast(err)})
    }
    const handleCreateChapter = async (ev) => {
        ev.preventDefault() // don't reload page
        closeChapterModal()
        createToast("creating a chapter!")
    }
    const handleCreateLesson = async (ev) => {
        ev.preventDefault() // don't reload page
        closeLessonModal()
        createToast("creating a lesson!")
    }

    // populate subjects / courses in forms
    const [subjects, setSubjects] = useState(null)
    useEffect(() => {
        api.getAllSubjects().then((res) => {
            setSubjects(res.data)
        })
    }, [])

    var subjectOptions = [<option value="" key="">Choose...</option>]
    if (subjects) {
        for (let subject in subjects) {
            subjectOptions.push(<option value={subjects[subject][0].subject_id}
                                    key={subject}>{subject}</option>)
        }
    }

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

            {/* Modal forms */}
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
            <Modal show={chapterModalState} onHide={closeChapterModal}>
                <Modal.Header closeButton>New Chapter:</Modal.Header>
            </Modal>
            <Modal show={lessonModalState} onHide={closeLessonModal}>
                <Modal.Header closeButton>New Lesson:</Modal.Header>
            </Modal>
            
        </div>
    );
}

export default Admin;