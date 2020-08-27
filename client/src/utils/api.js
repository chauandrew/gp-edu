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
        return getAuthToken().then(function(authToken) {
            let config = {
                data: {
                    subjectId: subjectId,
                    courseName: courseName,
                    sequence: sequence
                }, 
                headers: { Authorization: `Bearer ${authToken}` }
            }
            return axios.post(`${prefix}/api/v1/courses/create/course`, config)
        })
    },

    createChapter: function(courseId, chapterName, sequence=null) {
        return getAuthToken().then(function(authToken) {
            let config = {
                data: {
                    courseId: courseId,
                    chapter: chapterName,
                    sequence: sequence
                }, 
                headers: { Authorization: `Bearer ${authToken}` }
            }
            return axios.post(`${prefix}/api/v1/courses/create/chapter`, config)
        })
    },

    createLesson: function(chapterId, lessonNum=null, contentUrl, description) {
        return getAuthToken().then(function(authToken) {
            let config = {
                data: {
                    chapterId: chapterId,
                    lessonNum: lessonNum,
                    contentUrl: contentUrl,
                    description: description
                }, 
                headers: { Authorization: `Bearer ${authToken}` }
            }
            return axios.post(`${prefix}/api/v1/courses/create/lesson`, config)
        })
    }
}