import { UserMinus2, UserPlus2 } from 'lucide-react'
import PropTypes from "prop-types"
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'

const UserTiles = (props) => {
    const userId = useSelector((state)=>state.auth.userId)
    const [isFollowing, setIsFollowing] = useState(true)
    const [userName, setUserName] = useState("")
    const [userID, setUserID] = useState("")
    const [fullName, setFullName] = useState("")
    const [avatar, setAvatar] = useState("")
    let navigate = useNavigate()

    // const unfollow = async()=>{
    //     const response = await fetch(import.meta.env.VITE_BACKEND_URL+"/user/"+props.userName+"/follow",{
    //         method:'PATCH',
    //         headers:{
    //             'Content-type':'application/json',
    //         },
    //         credentials: 'include',
    //     })
    //     const json = await response.json()
    //     if(json.success){
    //         console.log(json.message)
    //     }else
    //         console.log("Error:"+json.message)
    // }

    const getuser=async ()=>{
        const response = await fetch(import.meta.env.VITE_BACKEND_URL+"/user/"+props.userName,{
            method:'GET',
            headers:{   
                'Content-type':'application/json',
            },
            credentials: 'include',
        })
        const json = await response.json()
        setUserID(json.mergedData.userId)
        setAvatar(json.mergedData[avatar])
        setFullName(json.mergedData.fullName)
        setIsFollowing(json.isFollowing)
    }

    useEffect(() => {
        setUserName(props.userName)
        getuser()
    },[])
    

  return (
    <>
        <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                    <img className="w-14 h-14 rounded-full cursor-pointer" onClick={()=>{navigate(`/profile/${userName}`)}} src={avatar?avatar:"https://res.cloudinary.com/dg7etzwks/image/upload/v1689588259/extras/userIcon_dhf5ym.png"} alt="user image"/>
                </div>
                <div className="flex-1 min-w-0 ">
                    <p  onClick={()=>{navigate(`/profile/${userName}`);location.reload()}} className="text-sm font-medium text-gray-900 truncate dark:text-white cursor-pointer hover:text-lightB">
                        {userName}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400 cursor-default">
                        {fullName}
                    </p>
                </div>
                {
                    userId!=userID? 
                        <div onClick={()=>{props.followUser(userName)}} className='h-fit inline-flex p-2 items-center rounded-full text-lightB hover:text-white dark:bg-cyan-950 dark:hover:bg-cyan-700'>
                            {isFollowing?<UserMinus2/>:<UserPlus2/>}
                        </div>:<></>
                }
            </div>
        </li>
    </>
  )
}

export default UserTiles

UserTiles.propTypes = {
    // avatar: PropTypes.string,
    userName: PropTypes.string,
    followUser: PropTypes.func,
    // fullName: PropTypes.string,
}