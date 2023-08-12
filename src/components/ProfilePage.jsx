import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Users2 } from 'lucide-react'

import BarLoader from '../widgets/BarLoader'
import ProfileCard from '../widgets/ProfileCard'
import PostCard from '../widgets/PostCard'
import Spinner from '../widgets/Spinner'
import FriendsList from '../widgets/FriendsList'
import alertContext from '../context/alertContext'
import Alert from '../widgets/Alert'

const ProfilePage = () => {
    const context = useContext(alertContext)
    const {alert,showAlert} = context
    const [switchList, setSwitchList] = useState(false)

    let navigate = useNavigate()
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

    const followUser = async(uname)=>{
        const response = await fetch(import.meta.env.VITE_BACKEND_URL+"/user/"+uname+"/follow",{
            method:'PATCH',
            credentials: 'include',
        })
        const json = await response.json()
        if(json.success){ 
            showAlert(json.success,json.message)
        }
        else    
            showAlert(json.success,json.message)
    }

    useEffect(() => {
        getUserInfo(username)
        getUserPosts(username)
        const unlisten = navigate(() => {});
          return unlisten;
    },[navigate])
    
    if(fetchingUser)
        return(<BarLoader/>)

    return (
        <>
            <Alert alert={alert}/>
            <div className='sticky place-self-center w-auto m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center p-2 gap-2 h-fit md:h-screen overflow-y-hidden'>
                <div className='h-fit w-auto md:block'>
                    <ProfileCard user={userInfo.mergedData} isFollowing={userInfo.isFollowing} followUser={followUser}/>
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
                                    return <PostCard key={post._id} post={post} showAlert={showAlert}/>
                                })
                            }
                        </>
                    } 
                </div>
                <div id='friendListDiv' className={`${switchList?'fixed w-full pr-4 max-h-[75%] overflow-y-scroll mx-auto':'hidden w-auto'} lg:block cursor-default`}>
                    <FriendsList following={userInfo.mergedData.following}/>
                </div>
                <div className='fixed bottom-0 mr-4 mb-4 w-fit right-0'>
                    <button onClick={()=>{switchList?setSwitchList(false):setSwitchList(true);document.getElementById('friendListDiv').classList.toggle("hidden");}} type="button" className="lg:hidden text-white bg-lightB  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 ">
                        <Users2/>
                    </button>
                </div>
            </div>
        </>
    )
}

export default ProfilePage