const express = require('express');
const router = express.Router();

const Jimp = require('jimp');
const path = require('path');
const auth = require('../middleware/auth');

const userService = require('../services/userService');


//route         POST /api/activate
//description   Set activate 
//access        Pvt
router.post('/',
    auth,
    async (req, res) => {
        const { name, avatar } = req.body;
        if (!name) {
            res.status(400).json({ msg: 'All fields are required' });
        }

        //convert base64 img to img file
        const buf = Buffer.from(avatar.replace(/data:image\/(jpeg|png|jpg);base64,/, ""), 'base64');

        const imgPath = `${Date.now()}_${Math.round(Math.random() * 1e9)}.png`;
        //imgpath will be like 412343353_3987898765.png

        try {
            const jimResp = await Jimp.read(buf);
            jimResp
                .resize(150, Jimp.AUTO)
                .write(path.resolve(__dirname, `../storage/${imgPath}`));
        } catch (err) {
            res.status(500).json({ message: 'Could not process the image' });
        }
        console.log("user in activate", req.user);
        const userId = req.user.id;

        console.log("userId in activate", userId);


        try {
            const user = await userService.findUser({ _id: userId });
            if (!user) {
                res.status(404).json({ msg: 'No such user exists' });
            }

            user.activated = true;
            user.name = name;
            user.avatar = `${process.env.BASE_URL}/storage/${imgPath}`;
            user.save();

            res.json({ user, auth: true })
        } catch (err) {
            res.status(500).json({ msg: "Db error" })
        }

        //auth is flag here for client
    }
)

module.exports = router;