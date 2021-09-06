const tokenService = require('../services/tokenService');

const auth = async (req, res, next) => {
    try {
        const { accessToken } = req.cookies;
        if (!accessToken) {
            throw new Error();

        }

        const userData = await tokenService.verifyToken(accessToken);
        if (!userData) {
            throw new Error();
        }
        req.user = userData;

        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({ msg: 'Invalid Token' })
    }

}

module.exports = auth;