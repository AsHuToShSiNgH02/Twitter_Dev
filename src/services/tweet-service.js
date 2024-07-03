const { TweetRepository } = require('../repository/index')

class TweetService {
    constructor() {
        this.tweetRepository = new TweetRepository();
    }

    async create(data) {
        const content = data.content;
        const tags = content.match(/#[a-zA-Z0-9_]+/g);
        tags = tags.map((tag) => tag.sunstring(1));
        console.log(tags);
        const tweet = await this.tweetRepository.create(data);
        //TODO CREATE HASHTAGS AND ADD HERE
        /**
         * 1. bulkcreate in mongoose
         * 2. filter titile of hashtags based on multiple tags
         * 3.how to add tweet id inside all the hashtags
         */
        return tweet;
    }
}

module.exports = TweetService;

/**
 * this is my #first #tweet . I am really #excited 
 */