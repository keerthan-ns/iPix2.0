import React from 'react'
import ProfileCard from '../widgets/ProfileCard'
import UploadPostCard from '../widgets/UploadPostCard'
import PostCard from '../widgets/PostCard'

const Home = () => {
  return (
    <>
        <div className='flex flex-row content-center justify-center p-2 gap-2'>
            {/* <div className='hidden lg:block'>
                <ProfileCard/>
            </div> */}
            <div className='flex flex-col w-full'>
                <UploadPostCard/>
                {/* <div className='flex flex-col'> */}
                    <PostCard/>
                {/* </div> */}
            </div>
            {/* <div className='hidden max-w-xs lg:block'>
                <ProfileCard/>
            </div> */}
        </div>
    </>
  )
}

export default Home