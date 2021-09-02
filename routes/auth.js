const express = require('express');
const router = express.Router();

const otpService = require('../services/otpService');
const hashService = require('../services/hashService');

router.post('/', async (req, res) => {

    const { phone } = req.body;
    if (!phone) {
        res.status(400).json({ msg: 'Phone field is required' });
    }

    const otp = await otpService.generateOtp();

    const otpExpireTime = 1000 * 60 * 5; //5minutes
    const expire = Date.now() + otpExpireTime;
    const data = `${phone}.${otp}.${expire}`;
    const hash = await hashService.hashOtp(data);

    res.json({ hash: hash });
})

module.exports = router;