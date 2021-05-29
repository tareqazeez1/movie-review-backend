import express from 'express';
import mongoose from 'mongoose';
import PostReview from '../models/postReview.js';


const router = express.Router();

//To get all the posts-->

export const getPosts = async (req, res) => {
    try {
        const postReviews= await PostReview.find();
        res.status(200).json(postReviews);
        
    } catch (error) {
        res.status(404).json( { message: error.message });
    }
}

//To create a post -->

export const createPost = async (req, res) => {
    const { title, review, selectedFile, creator, tags } = req.body;

    const newPostReview = new PostReview({ title, review, selectedFile, creator, tags })

    try {
        await newPostReview.save();
        res.status(201).json(newPostReview);

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//To update a post -->

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id.')
    
    const updatedPost = await PostReview.findByIdAndUpdate(_id, { ...post, _id }, { new: true })
    res.json(updatedPost);
}

//To delete a post -->

export const deletePost = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id.')
    
    await PostReview.findByIdAndRemove(id);
    console.log('DELETE')

    res.json({ message: 'Post deleted successfully'})

}

//To like a post --> 

export const likePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id.')

    const post = await PostReview.findById(id);
    const updatedPost = await PostReview.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });

    res.json(updatedPost);
}