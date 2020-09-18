var admin = require('../../loaders/firebaseAdmin');
const AuthService = require('../../services/AuthService');

const getAuthToken = (req, res, next) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
        req.authToken = req.headers.authorization.split(' ')[1];
    } else {
        req.authToken = null;
    }
    next();
};

/**
 * Middleware that takes an authToken, checks if it's valid, and sets
 * req.uid to the appropriate uid. 
 * @param {request} req 
 * @param {response} res 
 * @param {next} next 
 */
const checkIfAuthenticated = (req, res, next) => {
    getAuthToken(req, res, async () => {
        try {
            const { authToken } = req;
            const userInfo = await admin
                .auth()
                .verifyIdToken(authToken);
            req.uid = userInfo.uid;
            return next();
        } catch (e) {
            return res
                .status(401)
                .send({ error: 'You are not authorized to make this request' });
        }
    });
}

const checkIfAdmin = (req, res, next) => {
    checkIfAuthenticated(req, res, async () => {
        try {
            let isAdmin = await AuthService.isAdmin(req.authId)
            if (isAdmin) {
                return next();
            } else {
                return res.status(401).send({error: 'You must be a site admin to make this request!'})
            }
        } catch (e) {
            return res
                .status(401)
                .send({ error: 'You are not authorized to make this request' });
        }
    })
}

module.exports = {
    checkIfAuthenticated: checkIfAuthenticated,
    checkIfAdmin: checkIfAdmin
};