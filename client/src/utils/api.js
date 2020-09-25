import axios from "axios";
import db from "../firebase";
require('firebase/auth');

const getAuthToken = async () => {
    return db.auth().currentUser.getIdToken(true);
}

var prefix = "https://gp-edu.herokuapp.com"
// var prefix = ""

export default {
    // Get user details (firstname, lastname, email, bday)
    getUser: async function () {
        return getAuthToken().then(function(authToken) {
            const config = {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            };
            return axios.get(`${prefix}/api/v1/user`, config);
        })
    },

    // Create a user
    createUser: function(firstName, lastName, gradYear, email, password) {
        const config = {
            method: 'post',
            url: `${prefix}/auth/signup`,
            data: {
                firstName: firstName, lastName: lastName, 
                email: email, password: password, 
                gradYear: gradYear
            }
        };
        return axios(config);
    },

    // login with an email / password
    loginUser: function(email, password) {
        return db.auth().signInWithEmailAndPassword(email, password);
    },

    // Return all subjects
    getAllSubjects: function() {
        return axios.get(`${prefix}/api/v1/subject`)
    },

    // All subjects + courses (eg for the navbar)
    getAllSubjectsAndCourses: function() {
        return axios.get(`${prefix}/api/v1/course`)
    },

    // Find a course by courseId
    getCourse: function(courseId) {
        return axios.get(`${prefix}/api/v1/course/${courseId}`)
    },

    // Return a list of chapters by the courseId (Integer)
    getChaptersByCourseId: function(courseId) {
        return axios.get(`${prefix}/api/v1/chapter/course/${courseId}`)
    },
    

    // Get all courses a user is enrolled in
    getEnrolledCourses: function() {
        return getAuthToken().then(function(authToken) {
            let config = {
                headers: { Authorization: `Bearer ${authToken}` }
            }
            return axios.get(`${prefix}/api/v1/course/enrolled`, config)
        })
    },

    // get courses by subject name OR id 
    getCoursesBySubject: function(field) {
        return axios.get(`${prefix}/api/v1/course/subject/${field}`)
    },

    createCourse: function(subjectId, courseName, sequence) {
        let data = {
            subjectId: subjectId,
            courseName: courseName,
            sequence: sequence
        }
        return getAuthToken().then(function(authToken) {
            let config = {
                headers: { Authorization: `Bearer ${authToken}` }
            }
            return axios.post(`${prefix}/api/v1/course/create`, data, config)
        })
    },

    createChapter: function(courseId, chapterName, sequence=null, description) {
        let data = {
            courseId: courseId,
            chapterName: chapterName,
            sequence: sequence,
            description: description
        }
        return getAuthToken().then(function(authToken) {
            let config = {
                headers: { Authorization: `Bearer ${authToken}` }
            }
            return axios.post(`${prefix}/api/v1/chapter/create`, data, config)
        })
    },

    createLesson: function(chapterId, courseId, lessonName, lessonNum=null, contentUrl, description) {
        let data = {
            chapterId: chapterId,
            courseId: courseId,
            lessonName: lessonName,
            lessonNum: lessonNum,
            contentUrl: contentUrl,
            description: description
        }
        return getAuthToken().then(function(authToken) {
            let config = {
                headers: { Authorization: `Bearer ${authToken}` }
            }
            return axios.post(`${prefix}/api/v1/lesson/create`, data, config)
        })
    },

    // get chapters / lessons for course overview page
    getCourseOverview: function(courseId) {
        return axios.get(`${prefix}/api/v1/course/${courseId}/overview`)
    },

    // get lessons in the same chapter as a given lesson
    getRelatedLessons: function(lessonId) {
        return axios.get(`${prefix}/api/v1/lesson/${lessonId}/related`)
    },

    setLessonStatus: function(lessonId, statusId) {
        let data = {
            lessonId: lessonId, 
            statusId: statusId
        }
        return getAuthToken().then(function(authToken) {
            let config = { headers: {Authorization: `Bearer ${authToken}`} }
            return axios.post(`${prefix}/api/v1/lesson/progress/upsert`, data, config)
        })
    },

    getEnrolledLessons: function() {
        return getAuthToken().then(function(authToken) {
            let config = { headers: {Authorization: `Bearer ${authToken}`} }
            return axios.get(`${prefix}/api/v1/lesson/progress`, config)
        })
    },

    addComment: function(lessonId, body) {
        let data = { lessonId: lessonId, body: body }
        return getAuthToken().then(function(authToken) {
            let config= { headers: { Authorization: `Bearer ${authToken}` } }
            return axios.post(`${prefix}/api/v1/comment/create`, data, config)
        })
    }, 

    removeComment: function(commentId) {
        let data = { commentId: commentId }
        return getAuthToken().then(function(authToken) {
            let config= { headers: { Authorization: `Bearer ${authToken}` } }
            return axios.post(`${prefix}/api/v1/comment/remove`, data, config)
        })
    }, 

    updateComment: function(commentId, body) {
        let data = { commentId: commentId, body: body }
        return getAuthToken().then(function(authToken) {
            let config= { headers: { Authorization: `Bearer ${authToken}` } }
            return axios.post(`${prefix}/api/v1/comment/update`, data, config)
        })
    }, 

    getCommentsByLessonId: function(lessonId) {
        return axios.get(`${prefix}/api/v1/comment/lesson/${lessonId}`)
    }

}