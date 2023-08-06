import { CreditCard, MapPin, UserCog2, UserMinus2, UserPlus2, Users2 } from 'lucide-react'
import PropTypes from "prop-types"
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const ProfileCard = (props) => {
    let navigate = useNavigate()
    const userId = useSelector((state)=>state.auth.userId)
    const [isFollowing, setIsFollowing] = useState(props.isFollowing)

    const followUser = async()=>{
        await props.followUser(props.user.userName)
        isFollowing?setIsFollowing(false):setIsFollowing(true)
    }

    useEffect(() => {
      console.log(props)
    }, [])
    
  return (
    <>               
        <div className="divide-y divide-gray-700  p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700">        
            <div className=' flex flex-row justify-between mb-2 px-3'>
                <div className="flex items-center space-x-4">
                    {/* <img className="w-20 h-20 rounded-full" src="https://res.cloudinary.com/dg7etzwks/image/upload/v1689588259/extras/userIcon_dhf5ym.png" alt=""/> */}
                    <img className="w-20 h-20 rounded-full" src={props.user.avatar?props.user.avatar:"https://res.cloudinary.com/dg7etzwks/image/upload/v1689588259/extras/userIcon_dhf5ym.png"} alt=""/>
                    <div className="font-medium dark:text-white overflow-clip">
                        <div>{props.user.userName}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{props.user.email}</div>
                    </div>
                </div>
                {
                    userId==props.user.userId && 
                    <div className='flex items-center cursor-pointer text-white hover:text-lightB'>
                        <UserCog2 />
                    </div>
                }
            </div>
            <div className='flex flex-col items-start pl-4 py-2 gap-2'>
                <div className='flex flex-wrap text-white'>
                    <MapPin/>
                    <span className='text-gray-400 ml-3 my-auto'>{props.user.location?props.user.location:"Not available"}</span>
                </div>
                <div className='flex flex-wrap text-white'>
                    <CreditCard/>
                    <span className='text-gray-400 ml-3 my-auto'>{props.user.occupation?props.user.occupation:"Not available"}</span>
                </div>
            </div>
            <div className='flex flex-col items-start pl-4 py-2 gap-2'>
                <div className='flex flex-wrap text-white items-center'>
                    <Users2/>
                    <div className='flex flex-col'>
                        <span className='text-white ml-3 my-auto'>Following : {props.user.following?props.user.following.length:0}</span>
                        <span className='text-gray-400 ml-3 my-auto'>Views: {props.user.viewedProfile}</span>
                    </div>
                </div>
                {
                    userId==props.user.userId && location.pathname!=`/${props.user.userName}` &&
                    <div className='w-full flex'>
                        <button onClick={()=>{navigate(`/profile/${props.user.userName}`)}} type="button" className=" w-full text-lightB hover:text-white font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-cyan-950 dark:hover:bg-cyan-700 dark:focus:ring-white dark:border-white">View full profile</button>
                    </div>
                }
                {
                    userId!=props.user.userId? 
                    <div className='w-full flex'>
                        <button onClick={followUser} type="button" className=" w-full text-lightB hover:text-white font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-cyan-950 dark:hover:bg-cyan-700 dark:focus:ring-white dark:border-white">{isFollowing?"Unfollow":"Follow"}</button>
                    </div>:<></>
                }
            </div>
        </div>
    </>
  )
}

export default ProfileCard

ProfileCard.propTypes = {
    user: PropTypes.object,
    isFollowing: PropTypes.bool,
    followUser: PropTypes.func,
    // avatar: PropTypes.string,
    // userName: PropTypes.string,
    // fullName: PropTypes.string,
    // email: PropTypes.string,
    // location: PropTypes.string,
    // occupation: PropTypes.string,
}