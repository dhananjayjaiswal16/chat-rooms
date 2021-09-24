const jwt = require('jsonwebtoken');
const Refresh = require('../models/refresh');

const accessTokenSecret = process.env.JWT_ACCESS_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_SECRET;

const generateTokens = (payload) => {
    const accessToken = jwt.sign(payload, accessTokenSecret, {
        expiresIn: '1m',
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

const verifyToken = async (token) => {
    return jwt.verify(token, accessTokenSecret);
}

const verifyRefreshToken = async (token) => {
    return jwt.verify(token, refreshTokenSecret);
}

const findRefreshToken = async (userId, refreshToken) => {
    return await Refresh.findOne({ userId: userId, token: refreshToken })
}

const updateRefreshToken = async (userId, refreshToken) => {
    return await Refresh.updateOne({ userId: userId }, { token: refreshToken })
}

module.exports = { generateTokens, storeRefreshToken, verifyToken, verifyRefreshToken, findRefreshToken, updateRefreshToken };