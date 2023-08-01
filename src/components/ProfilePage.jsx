import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BarLoader from '../widgets/BarLoader'
import ProfileCard from '../widgets/ProfileCard'
import PostCard from '../widgets/PostCard'
import Spinner from '../widgets/Spinner'
import FriendsList from '../widgets/FriendsList'

const ProfilePage = () => {
    const {username} = useParams()
    const [fetchingUser, setFetchingUser] = useState(true)
    const [fetchingPosts, setFetchingPosts] = useState(true)
    const [posts, setPosts] = useState([])
    const [userInfo,setUserInfo] = useState()

    const getUserInfo=async (uname)=>{
        setFetchingUser(true)
        const response = await fetch(import.meta.env.VITE_BACKEND_URL+"/user/"+uname,{
            method:'GET',
            headers:{
                'Content-type':'application/json',
            },
            credentials: 'include',
        })
        const json = await response.json()
        setUserInfo(json)
        console.log(json)
        setFetchingUser(false)
    }

    const getUserPosts= async(uname)=>{
        setFetchingPosts(true)
        const response = await fetch(import.meta.env.VITE_BACKEND_URL+"/posts/"+uname+"/posts",{
            method:'GET',
            headers:{
                'Content-type':'application/json',
            },
            credentials: 'include',
        })
        const json = await response.json()
        if(json.success){
            setPosts(json.posts)
        }
        else{
            console.log("ERROR:"+json.message)     
        }
        setFetchingPosts(false)
    }

    useEffect(() => {
        getUserInfo(username)
        getUserPosts(username)
    },[])
    
    if(fetchingUser)
        return(<BarLoader/>)

    return (
        <>
            <div className='sticky place-self-center w-auto m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center p-2 gap-2 h-fit lg:h-screen overflow-y-hidden'>
                <div className='h-fit w-auto md:block'>
                    <ProfileCard user={userInfo.mergedData} isFollowing={userInfo.isFollowing}/>
                </div>
                <div className='top-0 mx-auto left-0 flex flex-col w-full gap-2 items-center overflow-y-scroll no-scrollbar'>
                    {
                        fetchingPosts?
                        <h1 className='mt-4 text-white text-center'><Spinner size={'10'}/>Loading posts..</h1>:
                        <>
                            {
                                posts.length==0 && <div className='w-full rounded-lg bg-gray-900 border-gray-700 py-6'><h1 className='text-white text-center'>No posts made yet</h1></div>
                            }
                            {
                                posts?.map((post)=>{
                                    return <PostCard key={post._id} post={post}/>
                                })
                            }
                        </>
                    } 
                </div>
                <div className='hidden w-auto lg:block cursor-default'>
                    <FriendsList following={userInfo.mergedData.following}/>
                </div>
            </div>
        </>
    )
}

export default ProfilePage