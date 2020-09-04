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
    createUser: function(firstName, lastName, birthday, 
                         gradeTypeId, email, password) {
        const config = {
            method: 'post',
            url: `${prefix}/auth/signup`,
            data: {
                firstName: firstName, lastName: lastName, 
                birthday: birthday, email: email, 
                password: password, 
                gradeTypeId: gradeTypeId
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
        return axios.get(`${prefix}/api/v1/courses/all`)
    },

    getCourse: function(courseId) {
        return axios.get(`${prefix}/api/v1/courses/${courseId}`)
    },

    // Return a list of chapters by the courseId (Integer)
    getChaptersByCourseId: function(courseId) {
        return axios.get(`${prefix}/api/v1/courses/${courseId}/chapters`)
    },

    // Get all courses a user is enrolled in
    getEnrolledCourses: function() {
        return getAuthToken().then(function(authToken) {
            let config = {
                headers: { Authorization: `Bearer ${authToken}` }
            }
            return axios.get(`${prefix}/api/v1/courses/enrolled`, config)
        })
    },

    // get courses by subject name OR id 
    getCoursesBySubject: function(field) {
        return axios.get(`${prefix}/api/v1/courses/subjects/${field}`)
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
            return axios.post(`${prefix}/api/v1/courses/create/course`, data, config)
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
            return axios.post(`${prefix}/api/v1/courses/create/chapter`, data, config)
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
            return axios.post(`${prefix}/api/v1/courses/create/lesson`, data, config)
        })
    },

    getCourseOverview: function(courseId) {
        return axios.get(`${prefix}/api/v1/courses/${courseId}/overview`)
    }
}