import {useEffect, useState} from 'react'
import Login from '../widgets/Login'
import Signup from '../widgets/Signup'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const Authentication = () => {
  const isAuth = useSelector((state)=>state.auth.isAuth)
  const [showLogin, setShowLogin] = useState(true)

  let navigate= useNavigate()
  useEffect(() => {
    if(isAuth)
      navigate("/")
  }, [])
  

  return (
    <>
        <div className='h-screen flex items-center justify-center'>
            {
                showLogin?<Login setShowLogin={setShowLogin}/>:<Signup setShowLogin={setShowLogin}/>
            }
        </div>
    </>
  )
}
