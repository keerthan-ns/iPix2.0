import {useState} from 'react'
import Login from '../widgets/Login'
import Signup from '../widgets/Signup'

export const Authentication = () => {
    const [showLogin, setShowLogin] = useState(true)
  return (
    <>
        <div className='w-full p-0'>
            {
                showLogin?<Login setShowLogin={setShowLogin}/>:<Signup setShowLogin={setShowLogin}/>
            }
        </div>
    </>
  )
}
