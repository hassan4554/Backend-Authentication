const { User } = require('../Schemas/User');
const bcrypt = require('bcrypt');

const createUser = async (userData) => {

    const userCheck1 = await User.findOne({
        username: userData.username
    })

    const userCheck2 = await User.findOne({
        email: userData.email
    })

    if (!userCheck1 && !userCheck2) {
        const newUser = new User(userData)

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(newUser.password, salt)
        newUser.password = hashPassword;
        await newUser.save();
        return newUser;
    } else {
        return false;
    }
}

module.exports = createUser;