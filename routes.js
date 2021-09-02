const router = require('express').Router();

//route         POST api/send-otp
//description   Send otp to server
//access        Pvt
router.post('/api/send-otp', (req, res) => {
    res.send('OTP Bhej');
})

module.exports = router;