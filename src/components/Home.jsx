import React from 'react'
import ProfileCard from '../widgets/ProfileCard'
import UploadPostCard from '../widgets/UploadPostCard'
import PostCard from '../widgets/PostCard'

const Home = () => {
  return (
    <>
        <div className='fixed place-self-center w-auto m-auto flex flex-col md:flex-row content-center justify-center p-2 gap-2 max-h-screen overflow-y-clip'>
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
                <ProfileCard/>
            </div>
        </div>
    </>
  )
}

export default Home