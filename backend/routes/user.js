import 'dotenv/config'
import express from 'express'
import {body,validationResult} from 'express-validator'

import fetchUser from '../middleware/fetchUser.js'
import User from '../models/User.js'
import UserInfo from '../models/UserInfo.js'

const router = express.Router()

router.get('/:uname',fetchUser,async(req,res)=>{
    try {
        const {uname} = req.params;
        const [user] = await User.find({userName:uname}).select("-password")

        if(!user)
            return res.status(404).json({message:"User not found"})

        const userId = user._id
        const userInfo = await UserInfo.findOne({userId:userId})
        const mergedData = { ...user.toObject(), ...userInfo.toObject()}
        res.status(200).json(mergedData)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
})

router.patch('/:uname/follow',fetchUser,async(req,res)=>{
    try {
        // const loggedId = req.body.id
        let message = "Added to following successfully"
        // whom the user wants follow as to be fetched first
        const {uname} = req.params;
        const [followUser] = await User.find({userName:uname}).select("-password")

        if(!followUser)
            return res.status(404).json({message:"User not found"})

        const followUname = followUser.userName

        // this userinfo is of the logged and requesting user
        const userInfo = await UserInfo.findOne({userId:req.user.id})
        // check if the username to be followed is present
        const isFollowing = userInfo.following.includes(followUname)
        if(isFollowing){
            await UserInfo.findOneAndUpdate({userId:req.user.id}, { $pull: { following: followUname } })
            message = "Removed from following"
        }
        else
            await UserInfo.findOneAndUpdate({userId:req.user.id}, { $push: { following: followUname } })

        res.status(200).json({success:true,message})
    } catch (error) {
        res.status(404).json({message: error.message})
    }
})

export default router