import mongoose from "mongoose";

const hashtagsSchema = mongoose.Schema({
    title : {
        type: String,
        required: true,
        unique: true
    },
    tweets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tweet'
        }
    ]
}, {timestamps: true});

const Hashtag = mongoose.model('Hashtags', hashtagsSchema);
export default Hashtag;