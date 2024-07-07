import {LikeRepository, TweetRepository, CommentRepository} from '../repository/index.js'
import Tweet from '../models/tweet.js';
import Comment from '../models/comment.js';

class LikeService{
    constructor(){
        this.likeRepository = new LikeRepository();
        this.tweetRepository = new TweetRepository();
        this.commentRepository = new CommentRepository();
    }

    async toggleLike(modelId, modelType, userId) { //api/v1/likes/toggle?id=modelid&type=Tweet

        let likable;
        if(modelType == 'Tweet'){
            likable = await this.tweetRepository.find(modelId);
        }else if(modelType == 'Comment'){
            likable = await this.commentRepository.find(modelId);
        }else{
            throw new Error('unknown model type');
        }
        const exists = await this.likeRepository.findByUserAndLikeable({
            user: userId,
            onModel: modelType,
            likable: modelId
        });
        if(exists) {
            likable.likes.pull(exists.id);
            await likable.save();
            await this.likeRepository.deleteOne({ _id: exists._id });
            var isAdded = false;
        } else {
            const newLike = await this.likeRepository.create({
                user: userId,
                onModel:modelType,
                likable: modelId
            });
            likable.likes.push(newLike);
            await likable.save();

            var isAdded = true;
        }
        return isAdded;
    }
}

export default LikeService;