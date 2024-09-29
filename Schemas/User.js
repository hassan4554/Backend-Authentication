const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id },
        process.env.PRIVATEKEY,
        { expiresIn: '1d' })
    return token;
}

const User = mongoose.model('User', userSchema);
module.exports = { User };