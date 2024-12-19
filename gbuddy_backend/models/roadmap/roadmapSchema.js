const mongoose = require('mongoose');

const roadmapSchema = mongoose.Schema({
    title: { 
        type: String, 
        required: true, 
        trim: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String, 
        required: true 
    },
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner'
    },
    prerequisites: [{ 
        type: String 
    }],
    topics: [{
        title: { type: String, required: true },
        orderIndex: { type: Number },
        duration: { type: String },
        resources: [{
            title: { type: String, required: true },
            url: { type: String, required: true }
        }]
    }],
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Roadmap', roadmapSchema);