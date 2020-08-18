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
        return getAuthToken().then(function(authToken) {
            let config = {
                headers: {
                    Authorization: `Bearer ${authToken}`
                    }
                }
            return axios.get(`${prefix}/api/v1/courses/all`, config)
        })
    },

    // Get all courses a user is enrolled in
    getEnrolledCourses: function() {
        return getAuthToken().then(function(authToken) {
            let config = {
                headers: { Authorization: `Bearer ${authToken}` }
            }
            return axios.get(`${prefix}/api/v1/courses/enrolled`, config)
        })
        
    }

}