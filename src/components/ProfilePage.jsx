import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BarLoader from '../widgets/BarLoader'

const ProfilePage = () => {
    const {username} = useParams()
    const [fetchingUser, setFetchingUser] = useState(true)

    useEffect(() => {
        setFetchingUser(true)

        setFetchingUser(false)
    },[])
    
    if(fetchingUser)
        return(<BarLoader/>)

    return (
        <>
            <h1 className='text-white text-center'>Profile page {username}</h1>
        </>
    )
}

export default ProfilePage