const loginRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const bcrypt = require('bcrypt');


loginRouter.post('/', async(request,response) => {
    const {username , password } = request.body;
    const user = await User.findOne({username});

    const correctPassword = user === null               
    ? false
    : await bcrypt.compare(password, user.passwordHash);
    
    if(!(user  && correctPassword)){
        return response.status(401).json({
            error : 'Invalid username or passowrd'
        })
    };

    // if username and password are correct create tokem

    const userInfoForToken = {
        username : user.username,
        id : user._id
    }

    const jwtUserToken = jwt.sign(userInfoForToken, process.env.SECRET);

    response
    .status(200)
    .json({
        jwtUserToken,
        username : user.username,
        name: user.name
    })
})

module.exports = loginRouter;