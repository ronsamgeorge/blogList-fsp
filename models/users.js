const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : String,
    name : String,
    passwordHash : String,
    blog : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Blog'
        }
    ]
})

userSchema.set('toJSON', {
    transform : (document, returnedObj) => {
        returnedObj.id  = document._id.toString();
        delete returnedObj._id;
        delete returnedObj.__v;
        delete returnedObj.passwordHash;
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;