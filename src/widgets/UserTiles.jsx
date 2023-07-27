import { UserMinus2, UserPlus2 } from 'lucide-react'
import PropTypes from "prop-types"
import { useEffect, useState } from 'react'

const UserTiles = (props) => {
    const [userName, setUserName] = useState("")
    const [fullName, setFullName] = useState("")
    const [avatar, setAvatar] = useState("")

    const unfollow = async()=>{
        console.log("unfollow fn")
    }

    const getuser=async ()=>{
        const response = await fetch(import.meta.env.VITE_BACKEND_URL+"/user/"+props.userName,{
            method:'GET',
            headers:{
                'Content-type':'application/json',
            },
            credentials: 'include',
        })
        const json = await response.json()
        setAvatar(json.avatar)
        setFullName(json.fullName)
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
                    <img className="w-14 h-14 rounded-full" src={avatar?avatar:"https://res.cloudinary.com/dg7etzwks/image/upload/v1689588259/extras/userIcon_dhf5ym.png"} alt="user image"/>
                </div>
                <div className="flex-1 min-w-0" onClick={()=>{console.log(userName)}}>
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {userName}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {fullName}
                    </p>
                </div>
                <div onClick={unfollow} className='h-fit inline-flex p-2 items-center rounded-full text-lightB hover:text-white dark:bg-cyan-950 dark:hover:bg-cyan-700'>
                    <UserMinus2/>
                    {/* <UserPlus2/> */}
                </div>
            </div>
        </li>
    </>
  )
}

export default UserTiles

UserTiles.propTypes = {
    // avatar: PropTypes.string,
    userName: PropTypes.string,
    // fullName: PropTypes.string,
}