import mongoose from "mongoose"

const UserInfoSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        fullName:{
            type : String,
            required : true,
            min : 2,
            max : 50,
        },
        avatar:{
            type : String,
            default : "https://res.cloudinary.com/dg7etzwks/image/upload/v1689588259/extras/userIcon_dhf5ym.png",
        },
        following:{
            type : Array,
            default : []
        },
        location : String,
        occupation : String,
        viewedProfile : {
            type: Number,
            default: 0,
        }
    },{timestamps:true}
)

const UserInfo = mongoose.model("UserInfo",UserInfoSchema)
export default UserInfo