import {TweetRepository, HashtagRepository} from '../repository/index.js'

class TweetService {
    constructor() {
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }

    async create(data) {
        const content = data.content;  
        /**
         * extracting hashtags from tweet(content), without hashtag sign i.e. removing first element
         */
        const tags = content.match(/#[a-zA-Z0-9_]+/g)
                        .map((tag) => tag.substring(1).toLowerCase());
        const tweet = await this.tweetRepository.create(data); //promise that it will create tweet
        let alreadyPresentTags = await this.hashtagRepository.findByName(tags);//findind all the hashtags present with hashtag schema
        let titleOfPresenttags = alreadyPresentTags.map(tags => tags.title);//extracting tags with just ther title
        let newTags = tags.filter(tag => !titleOfPresenttags.includes(tag));//gives tags which is not presnt in tags
        //storing new tags with there correponding tweet id
        newTags = newTags.map(tag => {
            return {title: tag, tweets: [tweet.id]};
        });
        await this.hashtagRepository.bulkCreate(newTags); // created new tags in mongodb
        //adding the tweet id of current tweet to already present tags, so that it refreces to all the tweet in which it was present
        alreadyPresentTags.forEach((tag) => {
            tag.tweets.push(tweet.id);
            tag.save();
        });
        return tweet;
    }

    async get(tweetId){
        const tweet = await this.tweetRepository.getWithComments(tweetId);
        return tweet;
    }
}

export default TweetService;

/**
 * this is my #first #tweet . I am really #excited 
 */