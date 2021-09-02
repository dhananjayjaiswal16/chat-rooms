const crypto = require('crypto');

const smsSid = process.env.smsSid;
const smsAuthToken = process.env.smsAuthToken;
const twilio = require('twilio')(smsSid, smsAuthToken, {
    lazyLoading: true
})
const generateOtp = async () => {
    const otp = crypto.randomInt(1000, 9999);
    return (otp);
}



const sendBySms = () => {

}



const verifyOtp = () => {

}


module.exports = { generateOtp, sendBySms, verifyOtp };