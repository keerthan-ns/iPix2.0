import 'dotenv/config'
import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {body,validationResult} from 'express-validator'

import User from '../models/User.js'
import UserInfo from '../models/UserInfo.js'
import fetchUser from '../middleware/fetchUser.js'

const router =express.Router()
// eslint-disable-next-line no-undef
const JWT_SECRET = process.env.JWT_SECRET

// route 1: POST 'api/auth/register'
router.post('/register',[
        body('uname',"Name should contain min 3 chars").isLength({ min: 3 }),
        body('email',"Enter a valid email").isEmail(),
        body('password',"Min password length must be 6").isLength({ min: 6 })
    ],async (req,res)=>{
        let success = false
        // if there are errors, return errors
        const errors = validationResult(req)
        if(!errors.isEmpty())
            return res.status(400).json({errors:errors.array()})
        // check if email exists already
        try{    
            let user =await User.findOne({ $or: [{ email: req.body.email }, { userName: req.body.uname }] })
            if(user)
                return res.status(400).json({success,message:"Email or username already exists"})

            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt)
            // create new user with await
            user = await User.create({
                userName: req.body.uname,
                email: req.body.email,
                password: secPass,
            })
            await UserInfo.create({
                userId: user.id,
                fullName: req.body.uname
            })
            const data = {
                user:{
                    id: user.id
                }
            }
            // jsonwebtoken
            const authtoken = jwt.sign(data,JWT_SECRET)
            success = true
            // new user stored is returned back
            res.cookie("authtoken",authtoken,{httpOnly: true}).json({success,message:"Account created successfully"})

            // res.json(user)
        }catch(error){
            // other errors are handled here
            res.status(500).send("Internal server error occured")
        }
})

// route 2: authentication a user using POST "/api/auth/login"
router.post('/login',[
    body('emailOrUsername',"Enter a valid email").exists(),
    body('password',"Password cannot be blank").exists()
],async (req,res)=>{
    let success = false
    // if there are errors, return errors
    const errors = validationResult(req)
    if(!errors.isEmpty())
        return res.status(400).json({errors:errors.array()})

    const {emailOrUsername,password} = req.body
    try{
        let user = await User.findOne({ $or: [{ email: emailOrUsername }, { userName: emailOrUsername }] })
        if(!user)
            return res.status(400).json({error:"Please login through valid credentials"})
        const passwordCompare = await bcrypt.compare(password,user.password)
        if(!passwordCompare)
            return res.status(400).json({error:"Please login through valid credentials"})
        
            const data = {
                user:{
                    id: user.id
                }
            }
            // jsonwebtoken
            const authtoken = jwt.sign(data,JWT_SECRET)
            success = true
            // new user stored is returned back
            res.cookie("authtoken",authtoken,{
                expires: new Date(Date.now() + 900000000),
                httpOnly: true,
                secure: true,
            })
            res.json({success,message:"Logged in successfully",authtoken})
    }catch(error){
        // other errors are handled here
        res.status(500).send("Internal server error occured")
    }
})

// route 3: get loggedin user details POST :"/api/auth/getuser" : login required
router.post('/getuser',fetchUser,async (req,res)=>{
    try{
        // obtained from fetchUSer function
        const userId = req.user.id
        const user = await User.findById(userId).select("-password")
        const userInfo = await UserInfo.findOne({userId:userId})
        const mergedData = { ...user.toObject(), ...userInfo.toObject()}
        res.send(mergedData)
    }catch(error){
        // other errors are handled here
        res.status(500).send("Internal server error")
    }
})

// route 4: logout the user by clearing the cookie POST:"/api/auth/logout" : login required
router.get('/logout',fetchUser,async(req,res)=>{
    try{
        res.clearCookie('authtoken')
        res.json({success:true,message:"Logged out successfully !!"})
    }catch(error){
        res.status(500).send("Internal server error")
    }
})


export default router
