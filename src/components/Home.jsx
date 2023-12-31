import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ProfileCard from '../widgets/ProfileCard'
import UploadPostCard from '../widgets/UploadPostCard'
import PostCard from '../widgets/PostCard'
import FriendsList from '../widgets/FriendsList'
import BarLoader from '../widgets/BarLoader'
import Spinner from '../widgets/Spinner'
import { setUserId, setUName } from '../state'
import alertContext from '../context/alertContext'
import Alert from '../widgets/Alert'

const Home = () => {
    const context = useContext(alertContext)
    const {alert,showAlert} = context
    const dispatch = useDispatch()
    const userId = useSelector((state)=>state.auth.userId)

    const [fetchingUser, setFetchingUser] = useState(true)
    const [fetchingPosts, setFetchingPosts] = useState(false)
    const [posts, setPosts] = useState([])
    const [avatar, setAvatar] = useState("")
    const [fullName, setFullName] = useState("")
    const [userName, setUserName] = useState("")
    const [location, setLocation] = useState("")
    const [email, setEmail] = useState("")
    const [occupation, setOccupation] = useState("")
    const [viewedProfile, setViewedProfile] = useState(0)
    const [following, setFollowing] = useState([])
    
    const getUserdata= async()=>{
        const response = await fetch(import.meta.env.VITE_BACKEND_URL+"/api/auth/getuser",{
            method:'POST',
            headers:{
                'Content-type':'application/json',
            },
            credentials: 'include',
        })
        const json = await response.json()
        if(json.success){
            initData(json.mergedData)
            getfollowings()
        }
        else{    
            showAlert(json.success,json.message)
        }
    }

    const getfollowings= async()=>{
        const response = await fetch(import.meta.env.VITE_BACKEND_URL+"/user/getfollowings",{
            method:'GET',
            headers:{
                'Content-type':'application/json',
            },
            credentials: 'include',
        })
        const json = await response.json()
        if(json.success){
            setFollowing(json.following.following)
        }
        else{
            showAlert(json.success,json.message)   
        }
    }

    const getPosts= async()=>{
        setFetchingPosts(true)
        const response = await fetch(import.meta.env.VITE_BACKEND_URL+"/posts/getPosts",{
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
            showAlert(json.success,json.message)     
        }
        setFetchingPosts(false)
    }

    const followUser = async(uname)=>{
        const response = await fetch(import.meta.env.VITE_BACKEND_URL+"/user/"+uname+"/follow",{
            method:'PATCH',
            credentials: 'include',
        })
        const json = await response.json()
        if(json.success){ 
            showAlert(json.success,json.message)
            getfollowings()
        }
        else  
            showAlert(json.success,json.message)  
    }

    const initData=async (userData)=>{
        dispatch(setUserId({userId:userData._id}))
        dispatch(setUName({uName:userData.userName}))
        setAvatar(userData.avatar)
        setFullName(userData.fullName)
        setUserName(userData.userName)
        setEmail(userData.email)
        setLocation(userData.location)
        setOccupation(userData.occupation)
        setViewedProfile(userData.viewedProfile)
    }

    useEffect(() => {
        setFetchingUser(true)
        getUserdata()
        setFetchingUser(false)
        getPosts()
    },[])

    if(fetchingUser)
        return(<BarLoader/>)
    
    return (
        <>
            <Alert alert={alert}/>
            <div className='sticky place-self-center w-auto m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center p-2 gap-2 h-screen overflow-y-hidden'>
                <div className='hidden w-auto md:block'>
                    <ProfileCard user={{userId,avatar,userName,fullName,email,location,following,occupation,viewedProfile}} getPosts={getPosts} getUserData={getUserdata} followUser={followUser} showAlert={showAlert}/>
                </div>
                <div className='mx-auto left-0 flex flex-col w-full gap-2 items-center overflow-y-scroll no-scrollbar'>
                    <UploadPostCard avatar={avatar} getPosts={getPosts}/>
                    {
                        fetchingPosts?
                        <h1 className='mt-4 text-white text-center'><Spinner size={'10'}/>Loading posts..</h1>:
                        <>
                            {
                                posts?.map((post)=>{
                                    return <PostCard key={post._id} post={post} followUser={followUser} showAlert={showAlert}/>
                                })
                            }
                        </>
                    }
                </div>
                <div className='hidden w-auto lg:block'>
                    <FriendsList following={following} followUser={followUser}/>
                </div>
            </div>
        </>
    )
}

export default Home