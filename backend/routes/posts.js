import 'dotenv/config'
import express from 'express'
import {body,validationResult} from 'express-validator'

import fetchUser from '../middleware/fetchUser.js'
import Post from '../models/Post.js'
import User from '../models/User.js'
import Comments from '../models/Comments.js'

const router = express.Router()

router.get('/getPosts',fetchUser,async(req,res)=>{
    try {
        const post = await Post.find().populate('comments').sort({ createdAt: -1 }).exec()
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
})

router.post('/uploadPost',fetchUser,[
        body("postText","Post content cannot be empty").exists()
    ],async(req,res)=>{
        let success = false
        // if there are errors, return errors
        const errors = validationResult(req)
        if(!errors.isEmpty())
            return res.status(400).json({errors:errors.array()})

        try {
            // obtained from fetchUSer function
            const userId = req.user.id
            const {location,postText,postImage} = req.body
            const newPost = new Post({
                userId,
                postText: postText,
            })
            if(location)
                newPost.location = location
            if(postImage)
                newPost.postImage = postImage
            
            const savedPost = await newPost.save()
            success = true
            res.send({success,savedPost})
        } catch (error) {
            res.status(404).json({message: error.message})
        }
})

router.get('/:uname/posts',fetchUser,async(req,res)=>{
    try {
        const {uname} = req.params;
        const [user] = await User.find({userName:uname}).select('_id')
        const userId = user._id
        const post = await Post.find({userId}).sort({ createdAt: -1 })
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
})

router.patch('/:postId/likesPost',fetchUser,async(req,res)=>{
    try {
        let success = true
        let message = "You liked the post"
        const userId = req.user.id
        const {postId} = req.params;
        const post = await Post.findById(postId)
        const isLiked = post.likedBy.includes(userId)

        if(isLiked){
            await Post.findByIdAndUpdate(postId, { $pull: { likedBy: userId } })
            message = "You removed the like"
        }
        else
            await Post.findByIdAndUpdate(postId, { $push: { likedBy: userId } })

        res.status(200).json({success,message})
    } catch (error) {
        res.status(404).json({message: error.message})
    }
})

router.post('/:postId/commentPost',fetchUser,[
        body("commentText","Comments cannot be empty").exists()
    ],async(req,res)=>{
        try {
            // if there are errors, return errors
            const errors = validationResult(req)
            if(!errors.isEmpty())
                return res.status(400).json({errors:errors.array()})

            const userId = req.user.id
            console.log(userId)
            const user = await User.findById(userId).select("userName")
            const userName = user.userName
            const {commentText} = req.body
            const {postId} = req.params;
            
            const newComment = new Comments({
                postId,
                userName,
                commentText,
            })
            await newComment.save()
            const post = await Post.findById(postId);
            post.comments.push(newComment);
            await post.save();
            res.status(200).json({success:true,message:"Your comment posted"})
        } catch (error) {
            res.status(404).json({message: error.message})
        }
})


export default router