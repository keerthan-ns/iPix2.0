import { BrowserRouter as Router,  Route, Routes, Navigate, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"

import { Authentication } from './components/Authentication'
import Navbar from './components/Navbar'
import Home from "./components/Home"
import ProfilePage from "./components/ProfilePage"

function App() {
  const isAuth = useSelector((state)=>state.auth.isAuth)
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

  return (
    <>
      {/* <div className={`container ${isAuth?'mt-24 lg:mt-28 mb-3':''}  mx-auto`}>
        <Authentication/>
      </div> */}
      {/* 
        <Routes>
          <Route exact path="/auth" element={<Authentication />} />
        </Routes>
        {!isAuth && <Navigate to="/auth" replace/>}  
        */}

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
    </>
  )
}

export default App
