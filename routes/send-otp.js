const express = require('express');
const router = express.Router();

const otpService = require('../services/otpService');
const hashService = require('../services/hashService');

//route         POST api/send-otp
//description   Send otp to server
//access        Pvt
router.post('/', async (req, res) => {

    const { phone } = req.body;
    if (!phone) {
        res.status(400).json({ msg: 'Phone field is required' });
    }
    //generate OTP
    const otp = await otpService.generateOtp();

    //hash otp and set expire time
    const otpExpireTime = 1000 * 60 * 5; //5minutes
    const expire = Date.now() + otpExpireTime;
    const data = `${phone}.${otp}.${expire}`;
    const hash = await hashService.hashOtp(data);

    //send otp as SMS to phone no
    try {
        // await otpService.sendBySms(phone, otp);
        res.json({
            hash: `${hash}.${expire}`,
            phone: phone,
            otp: otp
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Failed to send OTP" })
    }


})

module.exports = router;