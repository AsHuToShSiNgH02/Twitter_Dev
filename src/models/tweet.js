const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        max: [250, 'Tweet cannot be more than 250 character']
    },
    hashtagas: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hashtags'
        }
    ]
}, {timestamps: true});

const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;