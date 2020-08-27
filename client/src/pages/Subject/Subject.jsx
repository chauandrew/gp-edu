import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import api from '../../utils/api'
import './Subject.css'

const Subject = () => {
    const { subjectId } = useParams()
    const [courses, setCourses] = useState([])

    if (subjectId) {
        var color
        if (subjectId == "math") {
            color = "red"
        }
        if (subjectId == "science") {
            color = "orange"
        }
        if (subjectId == "humanities") {
            color = "blue"
        }
        if (subjectId == "life skills") {
            color = "green"
        }
        if (subjectId == "computer science") {
            color = "purple"
        }
    }

    if (color) {
        if (color == "red") {
            var txtColor = '#BA4040'
            var btnColor = '#D66E6E'
            var hvrColor = '#BA0000'
        }
        if (color == "orange") {
            var txtColor = '#CB815C'
            var btnColor = '#DBA78D'
            var hvrColor = '#'
        }
        if (color == "blue") {
            var txtColor = '#6391C0'
            var btnColor = '#92B2D3'
            var hvrColor = '#'
        }
        if (color == "green") {
            var txtColor = '#6EA1A1'
            var btnColor = '#92B8B9'
            var hvrColor = '#'
        }
        if (color == "purple") {
            var txtColor = '#7A7DCA'
            var btnColor = '#A2A4DA'
            var hvrColor = '#'
        }
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
        <div class="page-content" className="page-content">
            <h1>{subjectId}</h1>
            {courseList}
        </div>
    )
}

export default Subject