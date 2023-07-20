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
          <div className='container mt-28 mb-3 mx-auto content-center'>
            <Home/>
          </div>
      </Router>
    </>
  )
}

export default App
