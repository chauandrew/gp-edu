import axios from "axios";
import db from "../firebase";
require('firebase/auth');

const getAuthToken = async () => {
    return db.auth().currentUser.getIdToken(true);
}

var prefix = "https://gp-edu.herokuapp.com"
// var prefix = ""

export default {
    getUser: async function (uid) {
        return getAuthToken().then(function(authToken) {
            const config = {
                params: {
                    uid: uid
                },
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            };
            console.log(config)
            return axios.get(`${prefix}/api/v1/user`, config);
        })
    },
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
    loginUser: function(email, password) {
        return db.auth().signInWithEmailAndPassword(email, password);
    },
    getAllSubjects: function() {
        return getAuthToken()
        .then(function(authToken) {
            let config = {
                headers: {
                    Authorization: `Bearer ${authToken}`
                    }
                }
            return axios.get(`${prefix}/api/v1/courses/all`, config)
        })
    }
}