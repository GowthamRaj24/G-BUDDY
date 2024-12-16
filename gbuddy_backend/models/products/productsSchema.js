const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: { type: String, required: true, trim: true },
    images: [{
        type: String,
        required: true
    }],
    description: { type: String, required: true },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    sellerId: { type: String, required: true },
    buyerId: { type: String },
    category: { type: String, required: true },
    status: { 
        type: String, 
        enum: ['available', 'sold', 'reserved'],
        default: 'available'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('product', productSchema);
