const mongoose = require('mongoose');

MONGODB_URI='mongodb+srv://mgowthamraj9491:123000@gbuddy.zfkyv.mongodb.net/?retryWrites=true&w=majority&appName=GBUDDY'


const connect = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to the database');
    } catch (err) {
        console.log('Error connecting to the database', err);
    }
};

exports.connect = connect;