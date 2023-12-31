import {useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Login from '../widgets/Login'
import Signup from '../widgets/Signup'
import Alert from '../widgets/Alert'
import alertContext from '../context/alertContext'

export const Authentication = () => {
  let navigate= useNavigate()
  const context = useContext(alertContext)
  const {alert,showAlert} = context

  const isAuth = useSelector((state)=>state.auth.isAuth)
  const [showLogin, setShowLogin] = useState(true)


  useEffect(() => {
    if(isAuth)
      navigate("/")
  }, [])

  return (
    <>
      <Alert alert={alert}/>
      <div className='h-screen flex items-center justify-center'>
          {
              showLogin?<Login setShowLogin={setShowLogin} showAlert={showAlert}/>:<Signup setShowLogin={setShowLogin} showAlert={showAlert}/>
          }
      </div>
    </>
  )
}
