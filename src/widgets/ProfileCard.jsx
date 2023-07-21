import { CreditCard, MapPin, UserCog2, Users2 } from 'lucide-react'


const ProfileCard = () => {
  return (
    <>               
        <div className="divide-y divide-gray-700  p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700">        
            <div className=' flex flex-row justify-between mb-2 px-3'>
                <div className="flex items-center space-x-4">
                    <img className="w-16 h-16 rounded-full" src="https://res.cloudinary.com/dg7etzwks/image/upload/v1689588259/extras/userIcon_dhf5ym.png" alt=""/>
                    <div className="font-medium dark:text-white overflow-clip">
                        <div>andrew tate</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">andrew@ipix.com</div>
                    </div>
                </div>
                <div className='flex items-center'>
                    <UserCog2 color="#ffffff" />
                </div>
            </div>
            <div className='flex flex-col items-start pl-4 py-2 gap-2'>
                <div className='flex flex-wrap text-white'>
                    <MapPin/>
                    <span className='text-gray-400 ml-3 my-auto'>location</span>
                </div>
                <div className='flex flex-wrap text-white'>
                    <CreditCard/>
                    <span className='text-gray-400 ml-3 my-auto'>occupation</span>
                </div>
            </div>
            <div className='flex flex-col items-start pl-4 py-2 gap-2'>
                <div className='flex flex-wrap text-white items-center'>
                    <Users2/>
                    <div className='flex flex-col'>
                        <span className='text-white ml-3 my-auto'>Friends</span>
                        <span className='text-gray-400 ml-3 my-auto'>total views</span>
                    </div>
                </div>
                <div className='w-full flex'>
                    <button type="button" className=" w-full text-lightB hover:text-white font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-cyan-950 dark:hover:bg-cyan-700 dark:focus:ring-white dark:border-white">View full profile</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default ProfileCard