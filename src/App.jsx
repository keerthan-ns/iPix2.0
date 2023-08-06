import { BrowserRouter as Router,  Route, Routes, Navigate, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"

import { Authentication } from './components/Authentication'
import Navbar from './components/Navbar'
import Home from "./components/Home"
import ProfilePage from "./components/ProfilePage"
import Alert from "./widgets/Alert"
import { useContext, useState } from "react"
import AlertState from "./context/AlertState"
// import alertContext from "./context/alertContext"

function App() {
  const isAuth = useSelector((state)=>state.auth.isAuth)
  // const context = useContext(alertContext)
  // const {alert,setAlert,showAlert} = context
  // const [alert, setAlert] = useState(null)
  // const showAlert = (success,message) =>{
  //   setAlert({
  //     success: success,
  //     message: message,
  //   })
  //   setTimeout(() => {
  //     setAlert(null)
  //   }, 2000);
  // }
  // let navigate = useNavigate()
  // {
  //   !isAuth &&
  //     <Router>
  //       <Routes>
  //         <Route exact path="/auth" element={<Authentication/>}/>
  //       </Routes>
  //     </Router>
  //     {navigate('/auth')}
    
  // }
  {/* <div className={`container ${isAuth?'mt-24 lg:mt-28 mb-3':''}  mx-auto`}>
    <Authentication/>
  </div> */}
  {/* 
    <Routes>
      <Route exact path="/auth" element={<Authentication />} />
    </Routes>
    {!isAuth && <Navigate to="/auth" replace/>}  
    */}

  return (
    <>
      <AlertState>
        <Router>
          {(
            <>
              {isAuth && <Navbar/>}
              <div className={`container ${isAuth?'mt-24 lg:mt-28 ':''}  mx-auto`}>
                <Routes> 
                  <Route exact path='/auth' element={isAuth?<Navigate to='/' replace/>:<Authentication/>}/>
                  <Route exact path='/' element={isAuth?<Home/>:<Navigate to='/auth' replace/>}/>
                  <Route exact path='/profile/:username' element={isAuth?<ProfilePage/>:<Navigate to='/auth' replace/>}/>
                </Routes> 
              </div>
            </>
          )}
        </Router> 
      </AlertState>
    </>
  )
}

export default App
