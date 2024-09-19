const mongoose = require('mongoose');

module.exports = () => {
    try {
        mongoose.connect(process.env.DB,{ useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected with DB');

    } catch (error) {
        console.log(error)
        console.log('Could not connect with DB');
    }
}