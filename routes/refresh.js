const express = require('express');
const router = express.Router();

const tokenService = require('../services/tokenService')
const userService = require('../services/userService');

router.post('/', async (req, res) => {
    const { refreshToken: cookieRefreshToken } = req.cookies;
    let = userData;
    try {
        userData = await tokenService.verifyRefreshToken(cookieRefreshToken);
    } catch (err) {
        return res.status(401).json({ msg: 'Invalid Token' });
    }

    //Check if valid token is present
    try {
        const token = await tokenService.findRefreshToken(userData._id, cookieRefreshToken);
        if (!token) {
            return res.status(401).json({ msg: 'Invalid Token' })
        }
    } catch (err) {
        return res.status(500).json({ msg: 'Database Error' })
    }

    //Check if user is present
    let user;
    try {
        user = await userService.findUser({ _id: userId })
        if (!user) {
            return res.status(404).json({ msg: 'So such user found' })
        }
    } catch (err) {
        return res.status(500).json({ msg: 'Server error while looking for user' })
    }

    const { accessToken, refreshToken } = tokenService.generateTokens({ _id: userData._id });

    //Update token in db
    try {
        await tokenService.updateRefreshToken(userId, refreshToken);
    } catch (err) {
        return res.status(500).json({ msg: 'Server error' })
    }

    res.cookie('refreshToken', refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
    })
    res.cookie('accessToken', accessToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
    });

    res.json({ user, auth: true });
})

module.exports = router;
