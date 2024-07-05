import {LikeRepository, TweetRepository} from '../repository/index.js'
import Tweet from '../models/tweet.js';

class LikeService{
    constructor(){
        this.likeRepository = new LikeRepository();
        this.tweetRepository = new TweetRepository();
    }

    async toggleLike(modelId, modelType, userId) { //api/v1/likes/toggle?id=modelid&type=Tweet

        console.log(modelId, modelType, userId);
        if(modelType == 'Tweet'){
            var likable = await this.tweetRepository.find(modelId);

        }else if(modelType == 'Comment'){
            //TODO
        }else{
            throw new Error('unknown model type');
        }
        const exists = await this.likeRepository.findByUserAndLikeable({
            user: userId,
            onModel: modelType,
            likable: modelId
        });
        console.log("exists", exists);
        if(exists) {
            console.log("enter exists");
            likable.likes.pull(exists.id);
            await likable.save();
            await this.likeRepository.deleteOne({ _id: exists._id });
            var isAdded = false;
        } else {
            console.log("enter non exists");
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