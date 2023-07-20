import {Link,useLocation} from 'react-router-dom'
import { BellDot, Home, FlameIcon, LogOut } from 'lucide-react';

const Navbar = () => {
    let location = useLocation()
    
    const toggleNavbar=()=>{
        document.getElementById('navbar-Compo').classList.toggle("hidden");
    }
    const handleLogout =()=>{
        localStorage.removeItem("token")
        // window.location.reload()
    }
  return (
    <>
        <div className='fixed w-screen z-20 top-0 left-0 pt-4 px-2 md:px-4 bg-gray-950'>
            <nav className=" rounded-lg border border-lightB bg-white dark:bg-gray-950 shadow-lightB shadow-md bg-opacity-20 backdrop-blur-lg">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center">
                        <FlameIcon color="#ff7b00" className="h-8 mr-3" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">iPix</span>
                    </Link>
                    <div className="flex md:order-2">
                        <button onClick={toggleNavbar} type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-950 dark:focus:ring-lightB" aria-controls="navbar-search" aria-expanded="false">
                            <span className="sr-only">Open menu</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div className="items-center justify-between w-full md:flex md:w-auto md:order-1 hidden" id="navbar-Compo">
                        <ul className="flex flex-col items-left p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-950 dark:border-gray-700">
                            <li className='flex flex-wrap'>
                                <Link to="/" onClick={toggleNavbar} className={`block py-2 pl-3 pr-4 ${location.pathname==="/"?"text-lightB font-bold":"text-white"} hover:text-lightB hover:font-semibold`}><Home/></Link>
                                {/* block md:hidden */}
                                <span className='text-white ml-1 my-auto'>Home</span>
                            </li>
                            <li className='flex flex-wrap'>
                                <Link to="/about" onClick={toggleNavbar} className={`block py-2 pl-3 pr-4 ${location.pathname==="/notifcations"?"text-lightB font-bold":"text-white"} hover:text-lightB hover:font-semibold`}><BellDot/></Link>
                                <span className='text-white ml-1 my-auto'>Notifications</span>
                            </li>
                            <li className='flex flex-wrap'>     
                                {/* <div className="flex items-center justify-end md:order-2"> */}
                                    <div className="flex items-center ">
                                        <div className='flex items-center space-x-1 rounded-md pl-2 pr-1'>
                                            <img className="w-10 h-10 rounded-full" src="https://res.cloudinary.com/dg7etzwks/image/upload/v1689588259/extras/userIcon_dhf5ym.png" alt=""/>
                                        </div>
                                    </div>
                                    <span className='md:hidden text-white ml-1 my-auto'>Account</span>
                                {/* </div> */}
                            </li>
                            <li className='md:hidden flex flex-wrap'>
                                <Link onClick={handleLogout} className={`block py-2 pl-3 pr-4 text-white hover:text-lightB hover:font-semibold`}><LogOut/></Link>
                                <span className='text-white ml-1 my-auto'>Logout</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    </>
  )
}

export default Navbar