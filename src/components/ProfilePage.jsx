import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BarLoader from '../widgets/BarLoader'
import ProfileCard from '../widgets/ProfileCard'

const ProfilePage = () => {
    const {username} = useParams()
    const [fetchingUser, setFetchingUser] = useState(true)
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
        // console.log(json)
        setFetchingUser(false)
    }

    useEffect(() => {
        getUserInfo(username)
    },[])
    
    if(fetchingUser)
        return(<BarLoader/>)

    return (
        <>
            {
                !fetchingUser &&
                <ProfileCard user={userInfo}/>
            }
        </>
    )
}

export default ProfilePage