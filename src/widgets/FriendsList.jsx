import UserTiles from './UserTiles'

const FriendsList = () => {
  return (
    <>
        <div className="divide-y divide-gray-700 w-auto p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700">        
            <h2 className='text-lightB text-sm font-semibold mb-1'>Friends list</h2>
            <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                    <UserTiles avatar={"https://res.cloudinary.com/dg7etzwks/image/upload/v1689588259/extras/userIcon_dhf5ym.png"} userName={"hulk"} fullName={"Hulk Johnson"}/>
                    <UserTiles avatar={"https://res.cloudinary.com/dg7etzwks/image/upload/v1689588259/extras/userIcon_dhf5ym.png"} userName={"thor"} fullName={"Thor odin"}/>
                    <UserTiles avatar={"https://res.cloudinary.com/dg7etzwks/image/upload/v1689588259/extras/userIcon_dhf5ym.png"} userName={"neil_sims"} fullName={"Neil Sims"}/>
                </ul>
            </div>
        </div>
    </>
  )
}

export default FriendsList