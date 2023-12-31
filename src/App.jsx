import { BrowserRouter as Router,  Route, Routes, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

import { Authentication } from './components/Authentication'
import Navbar from './components/Navbar'
import Home from "./components/Home"
import ProfilePage from "./components/ProfilePage"
import AlertState from "./context/AlertState"

function App() {
  // access isAuth state from the redux store
  const isAuth = useSelector((state)=>state.auth.isAuth)
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
