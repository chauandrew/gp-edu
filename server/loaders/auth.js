const firebase = require('firebase');
const firebaseui = require('firebaseui');
const firebaseConfig = require('../config/firebase.json')

firebase.initializeApp(firebaseConfig);

var uiConfig = {
    signInSuccessUrl: '/',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: '/404',
    // Privacy policy url/callback.
    privacyPolicyUrl: function () {
        window.location.assign('/404');
    }
};

var ui = new firebaseui.auth.AuthUI(firebase.auth());
if (ui.isPendingRedirect()) {
    ui.start('#firebaseui-auth-container', uiConfig);
}

var authMiddleware = function(res, req, next) {
    
    next();
}