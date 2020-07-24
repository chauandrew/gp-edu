import axios from "axios";
import db from "../firebase";
require('firebase/auth');

const authHeaders = () => {
    return {Authorization: `Bearer ${db.auth().currentUser.getIdToken()}`}
}

export default {
    getUser: function (uid) {
        const config = {
            params: {
                uid: uid
            },
            headers: authHeaders()
        };
        return axios.get(`/api/v1/user`, config);
    },
    createUser: function(firstName, lastName, birthday, email, password) {
        const config = {
            method: 'post',
            url: '/auth/signup',
            data: {
                firstName: firstName, lastName: lastName, 
                birthday: birthday,
                email: email, password: password
            }
        }; 
        return axios(config);
    },
    loginUser: function(email, password) {
        return db.auth().signInWithEmailAndPassword(email, password);
    },
    allCourses: function() {
        const config = {
            method: 'post',
            url: '/api/v1/courses/all',
            headers: authHeaders()
        };
        return axios(config);
    }
}