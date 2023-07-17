import mongoose from 'mongoose';
import 'dotenv/config'

const uname = encodeURIComponent(process.env.USER_NAME)
const password = encodeURIComponent(process.env.USER_PASSWORD)
const mongoUrl = process.env.MONGO_URL

const mongoURI = "mongodb+srv://"+uname+":"+password+mongoUrl

const connectToMongo = async () =>{
    await mongoose.connect(mongoURI)
    console.log("Connected to MongoDB!");
}

export default connectToMongo