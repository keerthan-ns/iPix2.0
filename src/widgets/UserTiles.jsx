import { UserMinus2, UserPlus2 } from 'lucide-react'
import PropTypes from "prop-types"

const UserTiles = (props) => {
  return (
    <>
        <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                    <img className="w-10 h-10 rounded-full" src={props.avatar} alt="user image"/>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {props.userName}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {props.fullName}
                    </p>
                </div>
                <div className='h-fit inline-flex p-2 items-center rounded-full text-lightB hover:text-white dark:bg-cyan-950 dark:hover:bg-cyan-700'>
                    <UserMinus2/>
                    {/* <UserPlus2/> */}
                </div>
            </div>
        </li>
    </>
  )
}

export default UserTiles

UserTiles.propTypes = {
    avatar: PropTypes.string,
    userName: PropTypes.string,
    fullName: PropTypes.string,
}