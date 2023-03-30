
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


router.post('/', async (req, res) => {
    if (req.body.user==process.env.ADMIN && req.body.pwd==process.env.PWD) {

        const refreshToken = jwt.sign(
            { "adminname": req.body.user
               },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        res.json({ refreshToken });
    }
    else
    {
        res.send(400);
    }
});


module.exports = router;