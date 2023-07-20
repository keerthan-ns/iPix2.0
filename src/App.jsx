import { BrowserRouter as Router,  Route, Routes } from "react-router-dom"

import { Authentication } from './components/Authentication'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <Router>
            {/* <Authentication/> */}
          
            <Navbar/>
          <div className='container mt-24 mb-3 mx-auto content-center'>
          </div>
      </Router>
    </>
  )
}

export default App
