require('dotenv').config();
const crypto = require('crypto');
const hashService = require('./hashService');

const smsSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;
const twilio = require('twilio')(smsSid, smsAuthToken);


const generateOtp = async () => {
    const otp = crypto.randomInt(1000, 9999);
    return (otp);
}


const sendBySms = async (phone, otp) => {
    return await twilio.messages.create({
        to: phone,
        from: process.env.SMS_PHONE_NO,
        body: `Chat House OTP is ${otp}`
    })
}


const verifyOtp = async (hashOtp, data) => {
    var computedHash = await hashService.hashOtp(data);
    return (computedHash === hashOtp);
}


module.exports = { generateOtp, sendBySms, verifyOtp };