const usersRouter = require('express').Router();
const User = require('../models/users')
const bcrypt = require('bcrypt');

usersRouter.get('/', async (request,response) => {
    const users = await User.find({}).populate('blog', {title: 1});
    return response.json(users);
})

usersRouter.post('/', async(request,response) => {
    const {name , username , password} = request.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password,saltRounds);
    console.log(password);
    console.log(passwordHash);

    const newUser = new User ({
        username,
        name,    
        passwordHash,
    })
    console.log(newUser);

    const savedUser = await newUser.save();
    response.status(201).json(savedUser);

})

module.exports = usersRouter;