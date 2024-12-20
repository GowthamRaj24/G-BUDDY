const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String },
    displayname: { type: String, trim: true },
    description: { type: String },
    profileUrl: { type: String },
    score: { type: Number, default: 0 },
    campus: { type: String },
    branch: { type: String },
    year: { type: Number },
    rollnumber: { type: String },
    linkedin: { type: String },
    github: { type: String },
    leetcode: { type: String },
    semester: { type: Number },
    phone: { type: String },
    wallet: { type: Number, default: 0 },
    savedFiles: [{ type: String }],
    cart: [{ type: String }],
    authProvider: {
        type: String,
        enum: ['local', 'google'],
        default: 'local'
    },
    savedNotes : [{ type: String }],
}, {
    timestamps: true
});

module.exports = mongoose.model('users', usersSchema);
