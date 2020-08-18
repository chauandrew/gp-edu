var admin = require('../../loaders/firebaseAdmin');

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
 * req.authId to the appropriate uid. 
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
            req.authId = userInfo.uid;
            return next();
        } catch (e) {
            return res
                .status(401)
                .send({ error: 'You are not authorized to make this request' });
        }
    });
}

module.exports = {
    checkIfAuthenticated: checkIfAuthenticated
};