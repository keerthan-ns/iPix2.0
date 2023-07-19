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

router.patch('/update/fullName',fetchUser,[
        body('fullname',"Fullname must contain atleast 3 chars").isLength({ min: 3 })
    ],async(req,res)=>{
        try {
            // if there are errors, return errors
            const errors = validationResult(req)
            if(!errors.isEmpty())
                return res.status(400).json({message:errors.array()[0].msg})

            const fullname = req.body.fullname
            const userId = req.user.id

            const updatedInfo = await UserInfo.findOneAndUpdate({ userId: userId },{fullName: fullname },{new:true})
            res.status(200).json({success:true,message:"Updated your name",updatedInfo})

        } catch (error) {
            res.status(404).json({message: error.message})
        }
})

router.patch('/update/location',fetchUser,[
        body('location',"Location must contain atleast 3 chars").isLength({ min: 3 })
    ],async(req,res)=>{
        try {
            // if there are errors, return errors
            const errors = validationResult(req)
            if(!errors.isEmpty())
                return res.status(400).json({message:errors.array()[0].msg})

            const location = req.body.location
            const userId = req.user.id

            const updatedInfo = await UserInfo.findOneAndUpdate({ userId: userId },{location: location },{new:true})
            res.status(200).json({success:true,message:"Updated location",updatedInfo})
        } catch (error) {
            res.status(404).json({message: error.message})
        }
})

router.patch('/update/occupation',fetchUser,[
        body('occupation',"Occupation must contain min 3 chars").isLength({ min: 3 })
    ],async(req,res)=>{
        try {
            // if there are errors, return errors
            const errors = validationResult(req)
            if(!errors.isEmpty())
                return res.status(400).json({message:errors.array()[0].msg})
            
            const occupation = req.body.occupation
            const userId = req.user.id

            const updatedInfo = await UserInfo.findOneAndUpdate({ userId: userId },{occupation: occupation },{new:true})
            res.status(200).json({success:true,message:"Updated occupation",updatedInfo})
        } catch (error) {
            res.status(404).json({message: error.message})
        }
})

export default router