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
        picturePath:{
            type : String,
            default : "",
        },
        friends:{
            type : Array,
            default : []
        },
        location : String,
        occupation : String,
        viewedProfile : Number,
    },{timestamps:true}
)

const UserInfo = mongoose.model("UserInfo",UserInfoSchema)
export default UserInfo