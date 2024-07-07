import CrudRepository from "./crud-repository.js";
import Comment from '../models/comment.js';

class CommentRepository extends CrudRepository {
    constructor() {
        super(Comment);
    }
    
    async find(id) {
        try {
            const comment = await Comment.findById(id).populate({path: 'likes'});
            return comment;
        } catch (error) {
            console.log(error);
        }
    }
}

export default CommentRepository;