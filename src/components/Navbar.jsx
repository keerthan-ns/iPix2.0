import {Link,useLocation, useNavigate} from 'react-router-dom'
import { BellDot, Home, FlameIcon, LogOut, UserCircle2, Search, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuth, setUserId } from '../state';
import { useContext, useEffect, useState } from 'react';
import { Button, Label, TextInput, Textarea } from 'flowbite-react';
import UserTiles from '../widgets/UserTiles';
import Spinner from '../widgets/Spinner';
import alertContext from '../context/alertContext';
import Alert from '../widgets/Alert'
import PropTypes from "prop-types"

const Navbar = (props) => {
    const context = useContext(alertContext)
    const {alert,showAlert} = context
    const uName = useSelector((state)=>state.auth.uName)

    let navigate = useNavigate()
    let location = useLocation()
    const dispatch = useDispatch()
    const [searchList, setSearchList] = useState([])
    const [searchText, setSearchText] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    
    const toggleOptions=()=>{
        document.getElementById('options').classList.toggle("md:block");
    }

    const toggleSearch=()=>{
        document.getElementById('searchmodal').classList.toggle("hidden");
        setSearchText("")
        setSearchList([])
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
                showAlert(json.success,json.message)
            }
            else
                showAlert(json.success,json.message)
        } catch (error) {
            console.error('Error parsing response as JSON:', error);
        }
    }


    // let typingTimeout
    //     const handleSearchChange=(event)=>{
    //         setSearchText(event.target.value)
            
    //         clearTimeout(typingTimeout)

    //         typingTimeout = setTimeout(() => {
    //             sendSearchReq()
    //         }, 2000);
    //     }
    //     const sendSearchReq=()=>{
    //         console.log("req")
    //     }
    
    useEffect(() => {
        // Send the request to the backend with the searchText after 2 seconds of no typing
        const delay = setTimeout(() => {
          if (searchText) {
            searchRequestToBackend(searchText);
          }
        }, 1500);
    
        // Clean up the timeout on each change
        return () => clearTimeout(delay);
        
      }, [searchText]);
    
      const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchText(value);
      };
    
      const searchRequestToBackend = async(searchValue) => {
        setIsSearching(true)
        const response = await fetch(import.meta.env.VITE_BACKEND_URL+"/user/search",{
            method:'POST',
            headers:{
                'Content-type':'application/json',
            },
            credentials: 'include',
            body:JSON.stringify({
                'search':searchValue
            })
        })
        const json = await response.json()
        if(json.success){
            // console.log(json)
            setSearchList(json.searchResults)
            // setSearchList((prevSearchList) => {
            //     const updatedSearchList = json.searchResults;
            //     console.log(updatedSearchList); // This will log the updated searchList
            //     return updatedSearchList;
            //   })
            // console.log(searchList)
        }
        else{
            console.log("ERROR:"+json.message)     
        }
        setIsSearching(false)
      };
    

    
  return (
    <>
        <Alert alert={alert}/>
        <div className='fixed w-screen z-20 top-0 left-0 pt-4 px-2 md:px-4 bg-gray-950'>
            <nav className=" rounded-lg border border-lightB bg-white dark:bg-gray-950 shadow-lightB shadow-md bg-opacity-20 backdrop-blur-lg">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-3">
                    <Link to="/" className="flex items-center">
                        <FlameIcon color="#ff7b00" className="h-8 mr-3" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">iPix</span>
                    </Link>
                    {/* <div className='w-fit h-fit bg-white'> */}
                        <button type="button" onClick={toggleSearch} className=" text-gray-400 hover:text-lightB focus:outline-none rounded-lg text-sm p-2.5 mr-1" >
                            <span className="flex gap-2">
                            <Search size={20}/>
                            Explore...</span>
                        </button>
                    {/* </div> */}
                    <div className="flex md:order-2">
                        <button onClick={toggleNavbar} type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-950 dark:focus:ring-lightB" aria-controls="navbar-search" aria-expanded="false">
                            <span className="sr-only">Open menu</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div className="items-center justify-between w-full md:flex md:w-auto md:order-1 hidden" id="navbar-Compo">
                        {/* <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                                <span className="sr-only">Search icon</span>
                            </div>
                            <input type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..."/>
                        </div> */}
                        <ul className="flex flex-col gap-2 items-left p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-950 dark:border-gray-700">
                            <li>
                                <Link to="/" onClick={toggleNavbar} className={`flex flex-wrap py-2 pl-3 pr-4 ${location.pathname==="/"?"text-lightB font-bold":"text-white"} hover:text-lightB hover:font-semibold`}>
                                    <Home/>
                                    <span className=' ml-6 md:ml-2 my-auto'>Home</span>
                                </Link>
                                {/* block md:hidden */}
                            </li>
                            {/* <li>
                                <Link to="/notifications" onClick={toggleNavbar} className={`flex flex-wrap py-2 pl-3 pr-4 ${location.pathname==="/notifcations"?"text-lightB font-bold":"text-white"} hover:text-lightB hover:font-semibold`}>
                                    <BellDot/>
                                    <span className=' ml-6 md:ml-2 my-auto'>Notifications</span>
                                </Link>
                            </li> */}
                            <li className='flex flex-wrap'>     
                                {/* <div className="flex items-center justify-end md:order-2"> */}
                                    <div onClick={toggleOptions} className="pl-3 flex items-center ">
                                        {/* <div className='flex items-center space-x-1 rounded-md pl-2 pr-1'> */}
                                        <div className='flex items-center space-x-1 rounded-md text-white cursor-pointer'>
                                            {/* <img className="w-10 h-10 rounded-full" src="https://res.cloudinary.com/dg7etzwks/image/upload/v1689588259/extras/userIcon_dhf5ym.png" alt=""/> */}
                                            <UserCircle2 className='w-6 h-6'/>
                                        </div>
                                    </div>
                                    <Link to={`/profile/${uName}`} onClick={toggleNavbar}><span className='md:hidden text-white ml-6 my-auto'>View profile</span></Link>
                                    <div id="options" className="absolute hidden  z-10 top-14 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
                                            <li>
                                                <Link to={`/profile/${uName}`} onClick={toggleOptions} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">View profile</Link>
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
            {/* <div id="searchmodal" tabIndex="-1" className=" m-auto z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"> */}
            <div id="searchmodal" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full ">
                <div className="relative w-full max-w-md max-h-full mx-auto">
                    <div className="mt-24  relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button onClick={toggleSearch} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="updatenote-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-sm  text-white">Explore the community</h3>
                            <div className="mt-4 flex max-w-md flex-col gap-4 " >
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                        </svg>
                                        <span className="sr-only">Search icon</span>
                                    </div>
                                    <input onChange={handleSearchChange} value={searchText} type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..."/>
                                </div>
                            </div>
                        </div>
                        <div className='mx-2 pb-2 list-none flex flex-col gap-y-2 max-h-60 overflow-y-scroll'>
                            {
                                !isSearching?
                                    searchList.length>0?
                                        searchList.map((user,i)=>{
                                            return <div key={i} className="px-2 py-0 bg-gray-600 rounded-lg">
                                                    <li className="py-3 sm:py-4">
                                                        <div className="flex items-center space-x-4">
                                                            <div className="flex-shrink-0">
                                                                <Link to={`/profile/${user.userName}`}><img className="w-14 h-14 rounded-full cursor-pointer" onClick={()=>{navigate(`/profile/${user.userName}`)}} src={user.avatar?user.avatar:"https://res.cloudinary.com/dg7etzwks/image/upload/v1689588259/extras/userIcon_dhf5ym.png"} alt="user image"/></Link>
                                                                {/* <img className="w-14 h-14 rounded-full cursor-pointer" onClick={()=>{navigate(`/username`)}} src={"https://res.cloudinary.com/dg7etzwks/image/upload/v1689588259/extras/userIcon_dhf5ym.png"} alt="user image"/> */}
                                                            </div>
                                                            <div className="flex-1 min-w-0 ">
                                                                <p onClick={()=>{navigate(`/profile/${user.userName}`);location.reload;}} className="text-sm font-medium text-gray-900 truncate dark:text-white cursor-pointer hover:text-lightB">
                                                                    {user.userName}
                                                                    {/* username */}
                                                                </p>
                                                                <p className="text-sm text-gray-500 truncate dark:text-gray-400 cursor-default">
                                                                    {user.fullName}
                                                                    {/* fullName */}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </div>
                                        }):<h2 className='text-center pb-4 text-white'>No users found</h2>
                                :<div className="px-2 pt-2 pb-4"><Spinner size={'10'}/></div>
                            }
                                    
                            {
                                
                            }
                            {/* <div className="px-2 py-0 bg-gray-600 rounded-lg">
                                <UserTiles />
                            </div>
                            <div className="px-2 py-0 bg-gray-600 rounded-lg">
                                <UserTiles />
                            </div>
                            <div className="px-2 py-0 bg-gray-600 rounded-lg">
                                <UserTiles />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    </>
  )
}

export default Navbar

Navbar.propTypes = {
    username: PropTypes.string,
}