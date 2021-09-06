const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

//route         POST /api/activate
//description   Set activate 
//access        Pvt
router.post('/',
    auth,
    async (req, res) => {


        res.json({ msg: 'working' })
    }
)

module.exports = router;