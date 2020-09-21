import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
import api from '../../utils/api'
import './Subject.css'

const Subject = () => {
    const { subjectId } = useParams()
    const [courses, setCourses] = useState([])

    // get chapters / lessons for each course 
    useEffect(() => {
        api.getCoursesBySubject(subjectId).then(async (c) => {
            for (let i in c.data) {
                let chapters = await api.getCourseOverview(c.data[i].id)
                c.data[i]['chapters'] = chapters.data
            }
            setCourses(c.data)
        })
    }, [subjectId])

    // text coloring
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
        case "computer science": default: 
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
            let buttons = []
            for (let j in courses[i].chapters) {
                // only set lessonUrl if a corresponding lesson exists
                let lessonUrl = courses[i].chapters[j].lesson_id ? 
                        "/lessons/" + courses[i].chapters[j].lesson_id : "#"
                buttons.push(<a href={lessonUrl} class="button">
                    {courses[i].chapters[j].lesson_name}</a>)
            }
            let element = 
                <div className="topicList m-3">
                    <h4 className="courseName" style={{color:txtColor}}>
                        <a className="subject-link" href={"/courses/" + courses[i].id}>
                            {courses[i].course_name}</a>
                    </h4>
                    <div className="btn-group">
                        {buttons}
                    </div>
                </div>
            courseList.push(element)
        }
    }

    if (courses.length == 0) {
        return <Loading active={Boolean(courses)} />
    }
    return (
        <div id="subjectPage" className="page-content">
            <h1>{subjectId}</h1>
            {courseList}
        </div>
    )
}

export default Subject
