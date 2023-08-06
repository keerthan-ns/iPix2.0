import { Heart, MapPin, MessageSquare, Navigation, PlusCircle, SendHorizonal, Share2Icon, UserCog2, UserMinus2, UserPlus2, XCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types"
import { useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'

const PostCard = (props) => {
    let navigate = useNavigate()
    const [isFollowing, setIsFollowing] = useState(true)
    const [isLiked, setIsLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(0)
    const [commentText, setCommentText] = useState("")
    const [commentList, setCommentList] = useState([])
    const [commenting, setCommenting] = useState(false)
    
    const [userName, setUserName] = useState("")
    const [avatar, setAvatar] = useState("")

    const userId = useSelector((state)=>state.auth.userId)

    const toggleCommentList=()=>{
        document.getElementById(props.post._id).classList.toggle('hidden')
    }

    const toggleCommentModal=()=>{
        document.getElementById("comment-"+props.post._id).classList.toggle('hidden')
        document.getElementById("comment-"+props.post._id).classList.toggle('flex')
    }

    const handleCommentChange=(e)=>{
        setCommentText(e.target.value)
    }

    const handleCommentSubmit=async (e)=>{
        e.preventDefault()
        setCommenting(true)
        const response = await fetch(import.meta.env.VITE_BACKEND_URL+"/posts/"+props.post._id+"/commentPost",{
                method:'POST',
                headers:{
                        'Content-type':'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({commentText:commentText})
        })
        const json = await response.json()
        if(json.success){
            console.log(json.message)
            setCommentList((commentList)=>[...commentList,json.newComment])
            setCommentText("")
            toggleCommentModal()
        }
        else{
            console.log("ERROR:"+json.message)     
        }
        setCommenting(false)
    }

    const handleLike = async ()=>{
        const response = await fetch(import.meta.env.VITE_BACKEND_URL+"/posts/"+props.post._id+"/likesPost",{
            method:'PATCH',
            headers:{
                'Content-type':'application/json',
            },
            credentials: 'include',
        })
        const json = await response.json()
        if(json.success){
            console.log(json.message)
            isLiked?setLikeCount(likeCount-1):setLikeCount(likeCount+1)
            isLiked?setIsLiked(false):(setIsLiked(true))
        }
        else
            console.log("ERROR:"+json.message) 
    }

    const followUser=async()=>{
        await props.followUser(userName)
        isFollowing?setIsFollowing(false):setIsFollowing(true)
    }

    const getuser=async (userId)=>{
        const response = await fetch(import.meta.env.VITE_BACKEND_URL+"/user/id/"+userId,{
            method:'GET',
            headers:{
                'Content-type':'application/json',
            },
            credentials: 'include',
        })
        const json = await response.json()
        setIsFollowing(json.isFollowing)
        setAvatar(json.mergedData.avatar)
        setUserName(json.mergedData.userName)
    }

    useEffect(() => {
        getuser(props.post.userId)
        setCommentList(props.post.comments)
        setLikeCount(props.post.likedBy.length)
        setIsLiked(props.post.likedBy.includes(userId))
    },[])

    // date conversion logic
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear().toString().substr(-2);
        const suffix = getDaySuffix(day);
      
        return `${day}${suffix} ${month} ${year}`;
    }

    function getToday() {
        const date = new Date();
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear().toString().substr(-2);
        const suffix = getDaySuffix(day);
      
        return `${day}${suffix} ${month} ${year}`;
    }

    function getDaySuffix(day) {
        if (day >= 11 && day <= 13) {
          return 'th';
        }
        switch (day % 10) {
          case 1:
            return 'st';
          case 2:
            return 'nd';
          case 3:
            return 'rd';
          default:
            return 'th';
        }
    }
    

    return (
        <>
            <div className="divide-y divide-gray-700 w-full max-w-md py-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700">
                <div className=' flex flex-row justify-between mx-2 mb-2 items-center'>
                    <div className="flex items-center space-x-4">
                        <img className="w-14 h-14 rounded-full cursor-pointer" onClick={()=>{navigate(`/profile/${userName}`)}} src={avatar?avatar:"https://res.cloudinary.com/dg7etzwks/image/upload/v1689588259/extras/userIcon_dhf5ym.png"} alt=""/>
                        <div className="font-medium dark:text-white ">
                            <div className='cursor-pointer hover:text-lightB' onClick={()=>{navigate(`/profile/${userName}`)}}>{userName?userName:"loading..."}</div>                            
                            <div className="text-xs text-gray-500 dark:text-gray-400 cursor-default">Posted 
                                {
                                    (getToday() === formatDate(props.post.createdAt)?" Today":" on "+formatDate(props.post.createdAt))
                                }
                            </div>
                        </div>
                    </div>
                    {/* {
                        props.post.userId!=userId?
                        <div onClick={followUser} className='h-fit flex p-2 items-center rounded-full text-lightB hover:text-white dark:bg-cyan-950 dark:hover:bg-cyan-700'>
                            {isFollowing?<UserMinus2/>:<UserPlus2/>}
                        </div>:<></>
                    } */}
                </div>
                <div className='h-auto max-w-full mx-2 my-2 px-2 py-2 border-separate border border-white rounded-md'>
                    <p className='text-sm text-white text-justify'>{props.post.postText}</p>
                </div>
                {
                    props.post.postImage?
                        <div className='h-auto w-full bg-gray-300'><img className="h-auto max-w-full mx-auto " src={props.post.postImage} alt="post image"/></div>:
                        <></>
                }
                <div className='mt-2 px-4 py-2 flex flex-row justify-between'>
                    <div className='flex flex-row gap-4 px-3'>
                        <span className='flex flex-wrap gap-2 text-white' onClick={handleLike}><Heart className={isLiked?'text-lightB':''}/>{likeCount}</span>
                        <span className='flex flex-wrap gap-2 text-white' onClick={toggleCommentList}><MessageSquare/>{commentList.length}</span>
                        {
                            props.post.location &&
                            <div className="flex flex-row items-center gap-1 text-xs text-gray-500 dark:text-gray-400"><MapPin size={18} />{props.post.location} </div>
                        }
                    </div>
                    <span className='text-white'><Share2Icon/></span>
                </div>
                <div id={props.post._id} className=' hidden mx-2 pt-1'>
                    <button onClick={toggleCommentModal} className='ml-4 text-white text-sm flex flex-wrap gap-2 mb-2 mt-2'><PlusCircle size={20}/> Add comment..</button>
                    <ul className='ml-2 px-2 py-1 rounded-md max-h-28 bg-gray-800 text-gray-300 text-sm gap-2 flex flex-col divide-y divide-gray-700 text-left overflow-y-scroll '>    
                        {commentList.length>0 ? (
                                commentList.map((comment,i)=>{
                                    return (<div key={i}>
                                                <span className=' font-semibold text-xs'>{comment.userName}</span>
                                                <li className='ml-3 text-xs'>{comment.commentText}</li>
                                            </div>)
                                })                                
                                
                            ):<h2 className='pl-2 text-gray-400'>No comments yet</h2> 
                        }
                    </ul>
                </div>
            </div>
            <div id={`comment-${props.post._id}`} tabIndex="-1" aria-hidden="true" className="hidden fixed bg-[#01010187] top-0 left-0 right-0 z-50 items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full">
                <div className="relative w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button onClick={toggleCommentModal} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <XCircle/>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <form onSubmit={handleCommentSubmit} className="mt-8">
                                <div className='flex flex-row gap-2' >
                                    <input value={commentText} onChange={handleCommentChange} type="text" name="commentText" id="commentText" placeholder="Add your comment" className=" border  text-sm rounded-lg focus:ring-lightB focus:border-lightB block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" required/>
                                    <button className={`text-lightB bg-gray-600 rounded-full p-3 ${commenting?"animate-spin":""} `} ><SendHorizonal/></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div> 
        </>
    )
}

export default PostCard

PostCard.propTypes = {
    post: PropTypes.object,
    followUser: PropTypes.func,
}