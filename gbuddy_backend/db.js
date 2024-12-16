const mongoose = require('mongoose');

const database_url = process.env.DATABASE_URL;


const connect = async () => {
    try {
        await mongoose.connect(database_url);
        console.log('Connected to the database');
    } catch (err) {
        console.log('Error connecting to the database', err);
    }
};

exports.connect = connect;