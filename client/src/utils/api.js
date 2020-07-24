import axios from "axios";
import db from "../firebase";
require('firebase/auth');

const authHeaders = () => {
    return {Authorization: `Bearer ${db.auth().currentUser.getIdToken()}`}
}

var prefix = "" // todo: set up prod env or something to point at

export default {
    getUser: function (uid) {
        const config = {
            params: {
                uid: uid
            },
            headers: authHeaders()
        };
        return axios.get(`${prefix}/api/v1/user`, config);
    },
    createUser: function(firstName, lastName, birthday, email, password) {
        const config = {
            method: 'post',
            url: `${prefix}/auth/signup`,
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
    }
}