import { BrowserRouter as Router,  Route, Routes } from "react-router-dom"

import { Authentication } from './components/Authentication'
import Navbar from './components/Navbar'
import Home from "./components/Home"

function App() {

  return (
    <>
      <Router>
          {/* <Authentication/> */}
          
          <Navbar/>
          <div className='container mt-24 lg:mt-28 mb-3 mx-auto'>
            <Routes> 
              <Route exact path='/' element={<Home/>}/>
              {/* <Route exact path='/about' element={<About/>}/> */}
            </Routes> 
          </div>
      </Router>
    </>
  )
}

export default App
