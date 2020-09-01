import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import api from '../../utils/api'
import './Subject.css'

const Subject = () => {
    const { subjectId } = useParams()
    const [courses, setCourses] = useState([])

    var txtColor
    var btnColor
    var hvrColor
    switch (subjectId) {
        case "math":
            txtColor = '#BA4040'
            btnColor = '#D66E6E'
            hvrColor = '#BA0000'
            break
        case "science":
            txtColor = '#CB815C'
            btnColor = '#DBA78D'
            hvrColor = '#FD6A02'
            break
        case "humanities":
            txtColor = '#6391C0'
            btnColor = '#92B2D3'
            hvrColor = '#'
            break
        case "life skills":
            txtColor = '#6EA1A1'
            btnColor = '#92B8B9'
            hvrColor = '#'
            break
        case "computer science":
            txtColor = '#7A7DCA'
            btnColor = '#A2A4DA'
            hvrColor = '#'
            break
    }

    var courseList = []
    if (courses) {
        for (let i in courses) {
            let element = 
                <div class="topicList">
                    <h4 class="courseName" style={{color:txtColor}}>{courses[i].course_name}</h4>
                    <div class="btn-group">
                        <a href="#" class="button">Topic 1</a>
                        <a href="#" class="button">Topic 2</a>
                    </div>
                </div>
            courseList.push(element)
        }
    }

    useEffect(() => {
        api.getCoursesBySubject(subjectId).then(c => {
            setCourses(c.data)
            console.log(c.data)
        })
    }, [subjectId])

    return (
        <div className="page-content-subject">
            <h1>{subjectId}</h1>
            {courseList}
        </div>
    )
}

export default Subject
