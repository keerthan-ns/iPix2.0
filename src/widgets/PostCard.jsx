import { UserCog2, UserMinus2, UserPlus2 } from 'lucide-react'
import React from 'react'

const PostCard = () => {
  return (
    <>
        <div className="divide-y divide-gray-700 w-full max-w-md py-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700">
            <div className=' flex flex-row justify-between mx-2 mb-2 items-center'>
                <div className="flex items-center space-x-4">
                    <img className="w-16 h-16 rounded-full" src="https://res.cloudinary.com/dg7etzwks/image/upload/v1689588259/extras/userIcon_dhf5ym.png" alt=""/>
                    <div className="font-medium dark:text-white">
                        <div>andrew tate</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Posted on: 25th Apr 23</div>
                    </div>
                </div>
                <div className='h-fit flex p-2 items-center rounded-full text-lightB hover:text-white dark:bg-cyan-950 dark:hover:bg-cyan-700'>
                    <UserPlus2/>
                    {/* <UserMinus2/> */}
                </div>
            </div>
            <img className="max-h-md max-w-full mx-auto" src="https://res.cloudinary.com/dg7etzwks/image/upload/v1683852443/portfolioProjects/xhy9v39vuzy3qzbfgjdf.jpg" alt="image description"></img>
        </div>
    </>
  )
}

export default PostCard