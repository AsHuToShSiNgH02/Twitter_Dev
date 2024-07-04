const mongoose = require('mongoose');

const hashtagsSchema = mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    tweets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tweet'
        }
    ]
}, {timestamps: true});

const Hashtags = mongoose.model('Hashtags', hashtagsSchema);
module.exports = Hashtags;