const express = require('express');
const router = express.Router();

const tokenService = require('../services/tokenService')
const userService = require('../services/userService');

router.get('/', async (req, res) => {
    const { refreshToken: cookieRefreshToken } = req.cookies;
    let userData;
    try {
        userData = await tokenService.verifyRefreshToken(cookieRefreshToken);

    } catch (err) {
        return res.status(401).json({ msg: 'Token verification server err' });
    }

    //Check if valid token is present
    try {
        const token = await tokenService.findRefreshToken(userData.id, cookieRefreshToken);
        if (!token) {
            return res.status(401).json({ msg: 'DB error' })
        }
    } catch (err) {
        return res.status(500).json({ msg: 'Database Error' })
    }

    //Check if user is present
    let user;

    try {
        user = await userService.findUser({ id: userData.id })
        if (!user) {
            return res.status(404).json({ msg: 'So such user found' })
        }
    } catch (err) {
        return res.status(500).json({ msg: 'Server error while looking for user' })
    }

    const { accessToken, refreshToken } = tokenService.generateTokens({ id: userData.id });

    //Update token in db
    try {
        await tokenService.updateRefreshToken(userData.id, refreshToken);
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
    console.log("userData in refresh", userData);
    res.json({ user: userData, auth: true });
})

module.exports = router;
