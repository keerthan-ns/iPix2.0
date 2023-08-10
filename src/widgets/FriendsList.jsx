import { useEffect } from 'react'
import UserTiles from './UserTiles'
import PropTypes from "prop-types"

const FriendsList = (props) => {
  
  return (
    <>
        <div className="divide-y divide-gray-700 w-auto p-4 bg-white border  lg:max-h-[60%] lg:overflow-y-scroll no-scrollbar border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700">        
            <h2 className='text-lightB text-sm font-semibold mb-1'>Friends list</h2>
            <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                  {
                    Array.isArray(props.following)?props.following.map((userName,i)=>{
                      return <UserTiles key={i} userName={userName} followUser={props.followUser}/>
                    }):null
                  }
                  {
                    props.following.length==0 && <h2 className='text-center text-white'>Connect with community</h2>
                  }
                </ul>
            </div>
        </div>
    </>
  )
}

export default FriendsList

FriendsList.propTypes = {
  following: PropTypes.array,
  followUser: PropTypes.func,
}