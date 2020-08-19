import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import api from '../../utils/api'
import './Subject.css'

const Subject = () => {
    const { subjectId } = useParams()
    const [courses, setCourses] = useState([])

    var courseList = ""
    if (courses) {
        for (let i in courses) {
            courseList += `${courses[i].course_name}, `
        }
    }

    useEffect(() => {
        api.getCoursesBySubject(subjectId).then(c => {
            setCourses(c.data)
        })
    }, [subjectId])

    return (
        <div className="page-content">
            <h1>Subject: {subjectId}</h1>
            <p>{courseList}</p>
        </div>
    )
}

export default Subject