import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
import api from '../../utils/api'
import theme from '../../utils/theme'
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

    theme.setCssColors(subjectId);

    var courseList = []
    if (courses) {
        for (let i in courses) {
            let buttons = []
            for (let j in courses[i].chapters) {
                // only set lessonUrl if a corresponding lesson exists
                let lessonUrl = courses[i].chapters[j].lesson_id ? 
                        "/lessons/" + courses[i].chapters[j].lesson_id : "#"
                buttons.push(<a href={lessonUrl} class="button theme-bg-light">
                    {courses[i].chapters[j].lesson_name}</a>)
            }
            let element = 
                <div className="mt-3 mb-3">
                    <h4 className="theme-color">
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
