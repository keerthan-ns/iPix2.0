import React from 'react'
import ProfileCard from '../widgets/ProfileCard'
import UploadPostCard from '../widgets/UploadPostCard'
import PostCard from '../widgets/PostCard'
import FriendsList from '../widgets/FriendsList'

const Home = () => {
  return (
    <>
        <div className='sticky place-self-center w-auto m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 content-center justify-center p-2 gap-2 h-screen overflow-y-hidden'>
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