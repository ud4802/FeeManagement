const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { user, pwd  } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    const foundUser = await User.findOne({ username: user }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    // const email = foundUser.email;
    const match = await bcrypt.compare(pwd, foundUser.password);
    console.log(foundUser.verified);
    if(foundUser.verified==="true")
    {
        if (match) {
            //const roles = Object.values(foundUser.roles).filter(Boolean);
            // create JWTs
            // const accessToken = jwt.sign(
            //     {
            //         "UserInfo": {
            //             "username": foundUser.username,
            //             "email": foundUser.email,
                        
            //         }
            //     },
            //     process.env.ACCESS_TOKEN_SECRET,
            //     { expiresIn: '40s' }
            // );
            const refreshToken = jwt.sign(
                { "username": foundUser.username
                   },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            // Saving refreshToken with current user
            foundUser.refreshToken = refreshToken;
            const result = await foundUser.save();
            console.log(result);
            //console.log(roles);
    
            // Creates Secure Cookie with refresh token
            res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
    
            // Send authorization roles and access token to user
            // res.json({ accessToken });
            res.json({ refreshToken });
            // res.send(email);
    
        } else {
            res.sendStatus(401);
        }

    }
    else
    {
        res.sendStatus(402);

    }
    
}

module.exports = { handleLogin };