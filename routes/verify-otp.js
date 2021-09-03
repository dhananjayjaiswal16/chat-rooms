const express = require('express');
const router = express.Router();

const otpService = require('../services/otpService');

//route         POST api/send-otp
//description   Send otp to server
//access        Pvt
router.post('/', (req, res) => {
    const { phone, hash, otp } = req.body;
    if (!phone && !hash && !otp) {
        res.status(400).json({ "msg": "All fields must be provided" })
    }
    const [hashOtp, expire] = hash.split('.');
    if (Date.now() > +expire) {
        res.status(400).json({ "msg": "Your OTP has expired!!" });
    }

    const data = `${phone}.${otp}.${expire}`;

    const isOtpEqual = otpService.verifyOtp(hashOtp, data);
    if (!isOtpEqual) {
        res.status(400).json({ "msg": "Invalid OTP" });
    }
})
module.exports = router;