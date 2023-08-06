import 'dotenv/config'
import express from 'express'
import bcrypt from 'bcrypt'
import {body,validationResult} from 'express-validator'
import multer from 'multer'
import { v2 as cloudinary } from "cloudinary"

import fetchUser from '../middleware/fetchUser.js'
import User from '../models/User.js'
import UserInfo from '../models/UserInfo.js'

const router = express.Router()

router.get('/getfollowings',fetchUser,async (req,res)=>{
    try{
        // obtained from fetchUSer function
        const userId = req.user.id
        const following = await UserInfo.findOne({userId:userId}).select("following -_id")
        res.send({success:true,following})
    }catch(error){
        // other errors are handled here
        res.status(500).send("Internal server error")
    }
})

router.patch('/update/password',fetchUser,[
    body('password',"Min password length must be 6").isLength({ min: 6 })
],async(req,res)=>{
    try {
        // if there are errors, return errors
        const errors = validationResult(req)
        if(!errors.isEmpty())
            return res.status(400).json({message:errors.array()[0].msg})

        const userId = req.user.id
        // hash the new password 
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)

        await User.findByIdAndUpdate(userId,{password: secPass })
        res.status(200).json({success:true,message:"Password updated"})

    } catch (error) {
        res.status(404).json({message: error.message})
    }
})

router.get('/:uname',fetchUser,async(req,res)=>{
    try {
        const loggedId = req.user.id
        const {uname} = req.params;
        const [user] = await User.find({userName:uname}).select("-password")

        if(!user)
            return res.status(404).json({message:"User not found"})

        const userId = user._id
        const userInfo = await UserInfo.findOne({userId:userId})
        const mergedData = { ...user.toObject(), ...userInfo.toObject()}

        // if(loggedId!=userId)
        //     await UserInfo.findOneAndUpdate({userId:userId},{ $inc: { viewedProfile: 1 }},{new:true})

        // check if logged user if following this user
        const list = await UserInfo.findOne({userId:loggedId}).select("following")
        const isFollowing = list.following.includes(user.userName)

        res.status(200).json({mergedData,isFollowing})
    } catch (error) {
        res.status(404).json({message: error.message})
    }
})

router.get('/id/:uid',fetchUser,async(req,res)=>{
    try {
        const loggedId = req.user.id

        const {uid} = req.params
        const [user] = await User.find({_id:uid}).select("-password")

        if(!user)
            return res.status(404).json({message:"User not found"})

        const userId = user._id
        const userInfo = await UserInfo.findOne({userId:userId})
        const mergedData = { ...user.toObject(), ...userInfo.toObject()}

        // check if logged user if following this user
        const list = await UserInfo.findOne({userId:loggedId}).select("following")
        const isFollowing = list.following.includes(user.userName)

        res.status(200).json({mergedData,isFollowing})
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

router.patch('/update/profile',fetchUser,[
    body('fullname',"Fullname must contain atleast 3 chars").isLength({ min: 3 }),
    body('location',"Location must contain atleast 3 chars").isLength({ min: 3 }),
    body('occupation',"Occupation must contain min 3 chars").isLength({ min: 3 })
],async(req,res)=>{
    try {
        // if there are errors, return errors
        const errors = validationResult(req)
        if(!errors.isEmpty())
            return res.status(400).json({message:errors.array()[0].msg})

        const userId = req.user.id
        const fullname = req.body.fullname
        const location = req.body.location
        const occupation = req.body.occupation

        const updatedInfo = await UserInfo.findOneAndUpdate({ userId: userId },{fullName: fullname, location: location, occupation: occupation },{new:true})
        res.status(200).json({success:true,message:"Profile updated",updatedInfo})

    } catch (error) {
        res.status(404).json({message: error.message})
    }
})

// set-up required for uploading images
const storage = multer.memoryStorage()
const upload = multer({ 
    storage: storage 
})
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})

router.post('/update/profilepic',fetchUser,upload.single('updatePic'),async(req,res)=>{
        try {
            let success = false
            // obtained from fetchUSer function
            const userId = req.user.id
            let result
            if(req.file && req.file.buffer){
                result = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream({ folder: 'ipix2/profilepics' }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                    }).end(req.file.buffer);
                })
            }
            await UserInfo.findOneAndUpdate({ userId: userId },{avatar: result.secure_url },{new:true})
            success = true
            res.send({success,message:"Profile photo updated",avatar:result.secure_url})
        } catch (error) {
            res.status(404).json({message: error.message})
        }
})

router.post('/search',fetchUser,[
    body("search","Search cannot be empty").exists()
],async(req,res)=>{
    try {
        // if there are errors, return errors
        const errors = validationResult(req)
        if(!errors.isEmpty())
            return res.status(400).json({errors:errors.array()})

        const search = req.body.search
        
        const searchUser = await User.find({ userName: { $regex: search, $options: 'i' } }).select("-password -createdAt -updatedAt")
        const userIds = searchUser.map(user => user._id)
        const userInfoSemi = await UserInfo.find({ userId: { $in: userIds } }).select("-following -location -occupation")

        const userInfoSearchResults = searchUser.map(user => {
            const userInfo = userInfoSemi.find(info => info.userId.toString() === user._id.toString());
            return { ...user.toObject(), ...(userInfo ? userInfo.toObject() : {}) };
        })

        const searchUserInfo = await UserInfo.find({ fullName: { $regex: search, $options: 'i' } }).select("-following -location -occupation")
        const userInfoIds = searchUserInfo.map(user => user.userId)
        const userSemi = await User.find({ _id: { $in: userInfoIds } }).select("-password -createdAt -updatedAt")

        const userSearchResults = searchUserInfo.map(info => {
            const userI = userSemi.find(user => user._id.toString() === info.userId.toString());
            return { ...info.toObject(), ...(userI ? userI.toObject() : {}) };
        })


        // const searchResults = userInfoSearchResults.concat(userSearchResults)
        
        const uniqueUserIds = new Set();

        // Merge searchUser and userInfoSemi arrays while eliminating duplicates
        const searchResults = [];

        // Add searchUser objects to searchResults and uniqueUserIds
        userInfoSearchResults.forEach(user => {
        if (!uniqueUserIds.has(user.userId.toString())) {
            searchResults.push(user);
            uniqueUserIds.add(user.userId.toString());
        }
        });

        // Add userInfoSemi objects to searchResults and uniqueUserIds
        userSearchResults.forEach(info => {
        if (!uniqueUserIds.has(info.userId.toString())) {
            searchResults.push(info);
            uniqueUserIds.add(info.userId.toString());
        }
        })
        
        res.status(200).json({success:true,searchResults:searchResults})
    } catch (error) {
        res.status(404).json({message: error})
    }
})

export default router