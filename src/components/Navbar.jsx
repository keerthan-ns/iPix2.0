import {Link,useLocation, useNavigate} from 'react-router-dom'
import { BellDot, Home, FlameIcon, LogOut, UserCircle2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setIsAuth, setUserId } from '../state';
import { useState } from 'react';

const Navbar = () => {
    let navigate = useNavigate()
    let location = useLocation()
    const dispatch = useDispatch()
    const [hideOptions, setHideOptions] = useState(true)
    
    const toggleOptions=()=>{
        document.getElementById('options').classList.toggle("md:block");
    }

    const toggleNavbar=()=>{
        document.getElementById('navbar-Compo').classList.toggle("hidden");
    }
    const handleLogout =async()=>{
        const response = await fetch(import.meta.env.VITE_BACKEND_URL+"/api/auth/logout",{
            method:'GET',
            credentials: 'include',
        })
        try{
            const json =await response.json()
            if(json.success){
                dispatch(setIsAuth({isAuth:false}))
                dispatch(setUserId({userID:null}))
                localStorage.removeItem("reduxState")
                navigate("/auth")
                console.log(json.message)
            }
            else
                console.log(json.message)
        } catch (error) {
            console.error('Error parsing response as JSON:', error);
            }
    }
  return (
    <>
        <div className='fixed w-screen z-20 top-0 left-0 pt-4 px-2 md:px-4 bg-gray-950'>
            <nav className=" rounded-lg border border-lightB bg-white dark:bg-gray-950 shadow-lightB shadow-md bg-opacity-20 backdrop-blur-lg">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-3">
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
                        <ul className="flex flex-col gap-2 items-left p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-950 dark:border-gray-700">
                            <li>
                                <Link to="/" onClick={toggleNavbar} className={`flex flex-wrap py-2 pl-3 pr-4 ${location.pathname==="/"?"text-lightB font-bold":"text-white"} hover:text-lightB hover:font-semibold`}>
                                    <Home/>
                                    <span className=' ml-6 md:ml-2 my-auto'>Home</span>
                                </Link>
                                {/* block md:hidden */}
                            </li>
                            <li>
                                <Link to="/notifications" onClick={toggleNavbar} className={`flex flex-wrap py-2 pl-3 pr-4 ${location.pathname==="/notifcations"?"text-lightB font-bold":"text-white"} hover:text-lightB hover:font-semibold`}>
                                    <BellDot/>
                                    <span className=' ml-6 md:ml-2 my-auto'>Notifications</span>
                                </Link>
                            </li>
                            <li className='flex flex-wrap'>     
                                {/* <div className="flex items-center justify-end md:order-2"> */}
                                    <div onClick={toggleOptions} className="pl-2 flex items-center ">
                                        {/* <div className='flex items-center space-x-1 rounded-md pl-2 pr-1'> */}
                                        <div className='flex items-center space-x-1 rounded-md text-white'>
                                            {/* <img className="w-10 h-10 rounded-full" src="https://res.cloudinary.com/dg7etzwks/image/upload/v1689588259/extras/userIcon_dhf5ym.png" alt=""/> */}
                                            <UserCircle2 className='w-8 h-8'/>
                                        </div>
                                    </div>
                                    <span className='md:hidden text-white ml-5 my-auto'>View profile</span>
                                    <div id="options" className="absolute hidden  z-10 top-14 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
                                            <li>
                                                <Link to='' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">View profile</Link>
                                            </li>
                                            <li>
                                                <Link onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logout</Link>
                                            </li>
                                        </ul>
                                    </div>
                                {/* </div> */}
                            </li>
                            <li className='md:hidden flex flex-wrap'>
                                <Link onClick={handleLogout} className={`flex flex-row py-2 pl-3 pr-4 text-white hover:text-lightB hover:font-semibold`}>
                                    <LogOut/>
                                    <span className='text-white ml-6 my-auto'>Logout</span>
                                </Link>
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