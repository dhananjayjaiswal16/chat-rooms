const jwt = require('jsonwebtoken');
const Refresh = require('../models/refresh');

const accessTokenSecret = process.env.JWT_ACCESS_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_SECRET;

const generateTokens = (payload) => {
    const accessToken = jwt.sign(payload, accessTokenSecret, {
        expiresIn: '1h',
    })
    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
        expiresIn: '1y',
    })

    return { accessToken, refreshToken }
}

const storeRefreshToken = async (token, userId) => {
    try {
        await Refresh.create({
            token,
            userId
        })
    } catch (err) {
        console.error(err.msg);
    }
}

module.exports = { generateTokens, storeRefreshToken };