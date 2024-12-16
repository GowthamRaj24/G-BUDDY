const mongoose = require('mongoose');

const notesSchema = mongoose.Schema({
    title: { type: String, required: true, trim: true },
    sem: { type: Number, required: true },
    userId: { type: String, required: true },
    year: { type: Number, required: true },
    branch: { type: String, required: true },
    subject: { type: String, required: true },
    unit: { type: Number, required: true, enum: [1, 2, 3, 4, 5] },
    format: { type: String, required: true },
    description: { type: String },
    faculty: { type: String },
    documentUrl: { type: String, required: true },
    date: { type: Date, default: Date.now }
}, {
    timestamps: true
});

module.exports = mongoose.model('notes', notesSchema);
