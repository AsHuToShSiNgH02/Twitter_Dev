const express = require('express');
const connect = require('./config/database');
const app = express()

const TweetRepository = require('./repository/tweet-repository');
const Comment = require('./models/comment');

app.listen(3000, async () => {
    console.log("server started");
    await connect();
    console.log('Mongo db connected');
    // const tweet = await Tweet.create({
    //     content: 'third Email',
    //     userEmail: 'a@3'
    // });
    // const tweets = await Tweet.find({userEmail: 'a@b.com'});
    const tweetRepo = new TweetRepository();
    const tweet = await tweetRepo.create({content: 'with hooks now'});
    console.log(tweet);
    // const tweet = await tweetRepo.getAll(0, 5);
    // console.log(tweet[4].contentWithEmail);
    
});    