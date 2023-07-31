import { useEffect, useState } from 'react'
import ProfileCard from '../widgets/ProfileCard'
import UploadPostCard from '../widgets/UploadPostCard'
import PostCard from '../widgets/PostCard'
import FriendsList from '../widgets/FriendsList'
import BarLoader from '../widgets/BarLoader'
import Spinner from '../widgets/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { setUserId } from '../state'

const Home = () => {
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
            console.log("ERROR:"+json.message)     
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
            console.log("ERROR:"+json.message)     
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
            console.log("ERROR:"+json.message)     
        }
        setFetchingPosts(false)
    }

    const initData=async (userData)=>{
        dispatch(setUserId({userId:userData._id}))
        setAvatar(userData.avatar)
        setFullName(userData.fullName)
        setUserName(userData.userName)
        setEmail(userData.email)
        setLocation(userData.location)
        setOccupation(userData.occupation)
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
            <div className='sticky place-self-center w-auto m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center p-2 gap-2 h-screen overflow-y-hidden'>
                <div className='hidden w-auto md:block'>
                    <ProfileCard user={{userId,avatar,userName,fullName,email,location,following,occupation}}/>
                </div>
                <div className='mx-auto left-0 flex flex-col w-full gap-2 items-center overflow-y-scroll no-scrollbar'>
                    <UploadPostCard avatar={avatar} getPosts={getPosts}/>
                    {
                        fetchingPosts?
                        <h1 className='mt-4 text-white text-center'><Spinner size={'10'}/>Loading posts..</h1>:
                        <>
                            {
                                posts?.map((post)=>{
                                    return <PostCard key={post._id} post={post}/>
                                })
                            }
                        </>
                    }
                    
                    {/* <PostCard/> */}
                    {/*   <PostCard/>
                        <PostCard/>
                        <PostCard/>
                        <PostCard/>
                        <PostCard/>
                        <PostCard/> */}
                    {/* {
                        fetchingPosts?<Spinner/>:""
                    } */}
                </div>
                <div className='hidden w-auto lg:block'>
                    <FriendsList following={following}/>
                </div>
            </div>
            {/* <div className='fixed place-self-center w-auto m-auto flex flex-col md:flex-row content-center justify-center p-2 gap-2 max-h-screen overflow-y-clip'>
                <div className='hidden w-auto md:block'>
                    <ProfileCard/>
                </div>
                <div className='mx-auto left-0 flex flex-col max-w-fit gap-2 items-center overflow-y-scroll no-scrollbar'>
                    <UploadPostCard/>
                        <PostCard/>
                        <PostCard/>
                        <PostCard/>
                        <PostCard/>
                        <PostCard/>
                        <PostCard/>
                        <PostCard/>
                </div>
                <div className='hidden w-auto lg:block'>
                    <FriendsList/>
                </div>
            </div> */}
        </>
    )
}

export default Home