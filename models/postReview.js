import mongoose from 'mongoose';


const postSchema = mongoose.Schema({
    title: String,
    review: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const PostReview = mongoose.model('PostReview', postSchema)

export default PostReview;