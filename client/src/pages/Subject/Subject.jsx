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
            hvrColor = '#2784C7'
            break
        case "life skills":
            txtColor = '#6EA1A1'
            btnColor = '#92B8B9'
            hvrColor = '#73A58E'
            break
        case "computer science":
            txtColor = '#7A7DCA'
            btnColor = '#A2A4DA'
            hvrColor = '#786EC4'
            break
    }

    document.documentElement.style.setProperty(`--btnColor`, `${btnColor}`);
    document.documentElement.style.setProperty(`--hvrColor`, `${hvrColor}`);

    var courseList = []
    if (courses) {
        for (let i in courses) {
            let element = 
                <div className="topicList">
                    <h4 className="courseName" style={{color:txtColor}}>{courses[i].course_name}</h4>
                    <div className="btn-group">
                        <a href="#" className="button">Topic 1</a>
                        <a href="#" className="button">Topic 2</a>
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
        <div id="subjectPage" className="page-content">
            <h1>{subjectId}</h1>
            {courseList}
            <script>
                document.getElementById("topic1").style.backgroundColor = hvrColor
            </script>
        </div>
    )
}

export default Subject