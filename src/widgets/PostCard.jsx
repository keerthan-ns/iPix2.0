import { Heart, MessageSquare, PlusCircle, SendHorizonal, Share2Icon, UserCog2, UserMinus2, UserPlus2, XCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types"
import { useSelector } from 'react-redux'

const PostCard = (props) => {
    const [isLiked, setIsLiked] = useState(false)
    // const [postComments, setPostComments] = useState([])
    const userId = useSelector((state)=>state.auth.userId)

    const toggleCommentList=()=>{
        document.getElementById(props.post._id).classList.toggle('hidden')
    }

    const toggleCommentModal=()=>{
        document.getElementById("comment-"+props.post._id).classList.toggle('hidden')
        document.getElementById("comment-"+props.post._id).classList.toggle('flex')
    }

    useEffect(() => {
        setIsLiked(props.post.likedBy.includes(userId))
    },[])
    

    return (
        <>
            <div className="divide-y divide-gray-700 w-full max-w-md py-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700">
                <div className=' flex flex-row justify-between mx-2 mb-2 items-center'>
                    <div className="flex items-center space-x-4">
                        <img className="w-14 h-14 rounded-full" src="https://res.cloudinary.com/dg7etzwks/image/upload/v1689588259/extras/userIcon_dhf5ym.png" alt=""/>
                        <div className="font-medium dark:text-white">
                            <div>andrew tate</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Posted on: 25th Apr 23</div>
                        </div>
                    </div>
                    <div className='h-fit flex p-2 items-center rounded-full text-lightB hover:text-white dark:bg-cyan-950 dark:hover:bg-cyan-700'>
                        <UserPlus2/>
                        {/* <UserMinus2/> */}
                    </div>
                </div>
                <div className='h-auto max-w-full mx-2 my-2 px-2 py-2 border-separate border border-white rounded-md'>
                    <p className='text-sm text-white text-justify'>{props.post.postText}</p>
                </div>
                {
                    props.post.postImage?
                        <img className="h-auto max-w-full mx-auto" src={props.post.postImage} alt="post image"></img>:
                        <></>
                }
                <div className='mt-2 px-4 py-2 flex flex-row justify-between'>
                    <div className='flex flex-row gap-4 px-3'>
                        <span className='flex flex-wrap gap-2 text-white'><Heart className={isLiked?'text-lightB':''}/>{props.post.likedBy.length}</span>
                        <span className='flex flex-wrap gap-2 text-white' onClick={toggleCommentList}><MessageSquare/>{props.post.comments.length}</span>
                    </div>
                    <span className='text-white'><Share2Icon/></span>
                </div>
                <div id={props.post._id} className=' hidden mx-2 pt-1'>
                    <button onClick={toggleCommentModal} className='ml-4 text-white text-sm flex flex-wrap gap-2 mb-2 mt-2'><PlusCircle size={20}/> Add comment..</button>
                    <ul className='ml-2 px-2 py-1 rounded-md max-h-28 bg-gray-800 text-gray-300 text-sm gap-2 flex flex-col divide-y divide-gray-700 text-left overflow-y-scroll '>    
                        {props.post.comments.length>0 ? (
                                props.post.comments.map((comment,i)=>{
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
                            <form className="space-y-6" action="#">
                                <div className='hidden'>
                                    <input value={props.post._id} readOnly={true} type="text" name="commentId" id="commentId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required/>
                                </div>
                                <div className='flex flex-row gap-2' >
                                    <input type="text" name="commentText" id="commentText" placeholder="Add your comment" className=" border  text-sm rounded-lg focus:ring-lightB focus:border-lightB block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" required/>
                                    <button className='text-lightB bg-gray-600 rounded-full p-3'><SendHorizonal/></button>
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
}