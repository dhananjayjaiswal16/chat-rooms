const express = require('express');
const router = express.Router();

const otpService = require('../services/otpService');
const userService = require('../services/userService');
const tokenService = require('../services/tokenService');

//route         POST api/verify-otp
//description   Send otp to phone no. and verify
//access        Pvt
router.post('/', async (req, res) => {
    const { phone, hash, otp } = req.body;
    if (!phone && !hash && !otp) {
        res.status(400).json({ "msg": "All fields must be provided" })
    }
    //otp validation
    const [hashOtp, expire] = hash.split('.');
    if (Date.now() > +expire) {
        res.status(400).json({ "msg": "Your OTP has expired!!" });
    }

    const data = `${phone}.${otp}.${expire}`;

    const isOtpEqual = otpService.verifyOtp(hashOtp, data);
    if (!isOtpEqual) {
        res.status(400).json({ "msg": "Invalid OTP" });
    }

    //get user
    let user;
    try {
        user = await userService.findUser({ phone: phone });
        if (!user) {
            user = await userService.createUser({ phone: phone });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }

    //token
    const { accessToken, refreshToken } = tokenService.generateTokens({ id: user._id, activated: false })

    res.cookie('refreshtoken', refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
    });

    res.json({ accessToken });
})
module.exports = router;