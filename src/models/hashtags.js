const mongoose = require('mongoose');

const hashtagsSchema = mongoose.Schema({
    titel: {
        type: String,
        required: true
    },
    tweets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tweet'
        }
    ]
}, {timestaps: true});

const Hashtags = mongoose.model('Hashtags', hashtagsSchema);
module.exports = Hashtags;