const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')

const tokenService = require('../services/tokenService')

router.post('/', auth, async (req, res) => {
    const { refreshToken } = req.cookies;
    await tokenService.removeToken(refreshToken);

    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');

    res.json({ user: null, auth: false });
})


module.exports = router;