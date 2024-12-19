const mongoose = require('mongoose');

const notesSchema = mongoose.Schema({
    title: { type: String, trim: true },
    sem: { type: Number },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    branch: { type: String },
    subject: { type: String },
    unit: { type: Number, enum: [1, 2, 3, 4, 5] },
    format: { type: String },
    description: { type: String },
    faculty: { type: String },
    documentUrl: { type: String },
    date: { type: Date, default: Date.now },
    relatedVideos : { type: Array },

}, {
    timestamps: true
});

module.exports = mongoose.model('notes', notesSchema);
