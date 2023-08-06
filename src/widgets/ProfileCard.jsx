import { CreditCard, MapPin, UserCog2, UserMinus2, UserPlus2, Users2 } from 'lucide-react'
import PropTypes from "prop-types"
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Compressor from 'compressorjs'
import { Label, TextInput } from 'flowbite-react'


const ProfileCard = (props) => {
    let navigate = useNavigate()
    const userId = useSelector((state)=>state.auth.userId)
    const [isFollowing, setIsFollowing] = useState(props.isFollowing)
    const [selectedImageUpdate, setSelectedImageUpdate] = useState(null)
    const [profileImage, setProfileImage] = useState("")
    const [updateDetails, setUpdateDetails] = useState({upFullname:"",upLocation:"",upOccupation:""})
    const [buttonText,setButtonText] = useState({updateButton:"Update details",uploadButton:"Upload"})
    const [disableButton,setDisableButton] = useState(false)
    const [userDetails, setUserDetails] = useState({userId:"",userName:"",email:"",fullName:"",location:"",occupation:"",avatar:""})
    // const [upFullname, setUpFullname] = useState("")
    // const [upLocation, setUpLocation] = useState("")
    // const [upOccupation, setUpOccupation] = useState("")

    const followUser = async()=>{
        await props.followUser(props.user.userName)
        isFollowing?setIsFollowing(false):setIsFollowing(true)
    }

    const toggleUpdateModal=()=>{
        document.getElementById('updatemodal').classList.toggle("hidden")
    }

    const handleImageChangeUpdate = (event) => {
        const file = event.target.files[0]
        // handler if user selects other file than image/*
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file (e.g., PNG, JPG, GIF).') //replace with custom alert box
            event.target.value = null // Reset the input value to clear the selected file
            return
        }

        // if not gif file then compress the image
        if (!file.type.includes('gif')){
            new Compressor(file, {
                quality: 0.8, 
                success: (compressedResult) => {       
                  setProfileImage(compressedResult)
                },
            })
        }else
            setProfileImage(file) 
        
        const reader = new FileReader()
        reader.onloadend = () => {
          setSelectedImageUpdate(reader.result)
        };
      
        if (file) 
          reader.readAsDataURL(file)
    }

    const handleUpdateForm = async(e)=>{
        e.preventDefault()
        setDisableButton(true)
        setButtonText((prevText)=>({
            ...prevText,
            updateButton:"Updating.."
        }))
        const response = await fetch(import.meta.env.VITE_BACKEND_URL+"/user/update/profile",{
            method:'PATCH',
            credentials: 'include',
            headers:{
                'Content-type':'application/json',
            },
            body: JSON.stringify({fullname:updateDetails.upFullname,location: updateDetails.upLocation,occupation: updateDetails.upOccupation})
        })
        const json = await response.json()
        if(json.success){
            console.log(json.message)//use custom alert later 
            setUserDetails((prevDetails)=>({
                ...prevDetails,
                fullName:updateDetails.upFullname,
                location:updateDetails.upLocation,
                occupation:updateDetails.upOccupation,
            }))
        }
        else    
            console.log("ERROR:"+json.message)
        setButtonText((prevText)=>({
            ...prevText,
            updateButton:"Update details"
        }))
        setDisableButton(false)
    }

    const handleUpdatePic = async(e)=>{
        e.preventDefault()
        setDisableButton(true)
        setButtonText((prevText)=>({
            ...prevText,
            uploadButton:"Uploading.."
        }))
        const formData = new FormData()
        formData.append("updatePic",profileImage)
        const response = await fetch(import.meta.env.VITE_BACKEND_URL+"/user/update/profilepic",{
            method:'POST',
            credentials: 'include',
            body: formData
        })
        const json = await response.json()
        if(json.success){
            console.log(json.message)//use custom alert later 
            setUserDetails((prevDetails)=>({
                ...prevDetails,
                avatar:json.avatar
            }))
            props.getUserData()
            props.getPosts()
        }
        else    
            console.log("ERROR:"+json.message)
        setButtonText((prevText)=>({
            ...prevText,
            uploadButton:"Upload"
        }))
        setDisableButton(false)
    }

    const handleChange=(e)=>{
        setUpdateDetails({
        ...updateDetails,[e.target.id]:e.target.value
        })
    }

    useEffect(() => {
      console.log("PC: "+props)
        setUpdateDetails({
            upFullname:props.user.fullName,
            upLocation:props.user.location,
            upOccupation:props.user.occupation,
        })
        setUserDetails({
            userId:props.user.userId,
            fullName:props.user.fullName,
            userName:props.user.userName,
            email:props.user.email,
            location:props.user.location,
            occupation:props.user.occupation,
            avatar:props.user.avatar,
        })
        setSelectedImageUpdate(props.user.avatar)
    }, [props])
    
  return (
    <>               
        <div className="divide-y divide-gray-700  p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700">        
            <div className=' flex flex-row justify-between mb-2 px-3'>
                <div className="flex items-center space-x-4">
                    {/* <img className="w-20 h-20 rounded-full" src="https://res.cloudinary.com/dg7etzwks/image/upload/v1689588259/extras/userIcon_dhf5ym.png" alt=""/> */}
                    <img className="w-20 h-20 rounded-full" src={userDetails.avatar?userDetails.avatar:"https://res.cloudinary.com/dg7etzwks/image/upload/v1689588259/extras/userIcon_dhf5ym.png"} alt=""/>
                    <div className="font-medium dark:text-white overflow-clip">
                        <div>{userDetails.userName}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{userDetails.email}</div>
                    </div>
                </div>
                {
                    userId==userDetails.userId && 
                    <div onClick={toggleUpdateModal} className='flex items-center cursor-pointer text-white hover:text-lightB'>
                        <UserCog2 />
                    </div>
                }
            </div>
            <div className='flex flex-col items-start pl-4 py-2 gap-2'>
                <div className='flex flex-wrap text-white'>
                    <MapPin/>
                    <span className='text-gray-400 ml-3 my-auto'>{userDetails.location?userDetails.location:"Not available"}</span>
                </div>
                <div className='flex flex-wrap text-white'>
                    <CreditCard/>
                    <span className='text-gray-400 ml-3 my-auto'>{userDetails.occupation?userDetails.occupation:"Not available"}</span>
                </div>
            </div>
            <div className='flex flex-col items-start pl-4 py-2 gap-2'>
                <div className='flex flex-wrap text-white items-center'>
                    <Users2/>
                    <div className='flex flex-col'>
                        <span className='text-white ml-3 my-auto'>Following : {props.user.following?props.user.following.length:0}</span>
                        <span className='text-gray-400 ml-3 my-auto'>Views: {props.user.viewedProfile}</span>
                    </div>
                </div>
                {
                    userId==userDetails.userId && location.pathname!=`/${userDetails.userName}` &&
                    <div className='w-full flex'>
                        <button onClick={()=>{navigate(`/profile/${userDetails.userName}`)}} type="button" className=" w-full text-lightB hover:text-white font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-cyan-950 dark:hover:bg-cyan-700 dark:focus:ring-white dark:border-white">View full profile</button>
                    </div>
                }
                {
                    userId!=userDetails.userId? 
                    <div className='w-full flex'>
                        <button onClick={followUser} type="button" className=" w-full text-lightB hover:text-white font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-cyan-950 dark:hover:bg-cyan-700 dark:focus:ring-white dark:border-white">{isFollowing?"Unfollow":"Follow"}</button>
                    </div>:<></>
                }
            </div>
        </div>
        <div id="updatemodal" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full ">
                <div className="relative w-full max-w-md max-h-full mx-auto">
                    <div className="mt-24  relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button onClick={toggleUpdateModal} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="updatenote-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-sm text-center font-semibold text-lightB">Update profile</h3>
                            <div className="mt-4 flex max-w-md flex-col gap-4 " >
                                    <form onSubmit={handleUpdateForm} className='flex flex-col gap-4'>
                                        <div>
                                            <TextInput onChange={handleChange} value={updateDetails.upFullname} className='w-full' id="upFullname" name="emailOrUsername" placeholder="Enter full name" required type="text" />
                                        </div>
                                        <div>
                                            <TextInput onChange={handleChange} value={updateDetails.upLocation} className='w-full' id="upLocation" name="emailOrUsername" placeholder="Enter location" required type="text" />
                                        </div>
                                        <div>
                                            <TextInput onChange={handleChange} value={updateDetails.upOccupation} className='w-full' id="upOccupation" name="emailOrUsername" placeholder="Enter occupation" required type="text" />
                                        </div>
                                        <button disabled={disableButton} className={`${disableButton?"cursor-not-allowed":""} text-white bg-lightB hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-cyan-950 dark:hover:bg-cyan-700`}>{buttonText.updateButton}</button>
                                    </form>
                                    <form onSubmit={handleUpdatePic}  encType='multipart/form-data' className="flex gap-2 items-center justify-center w-full mb-2">
                                        <label htmlFor="profileImage" className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                            <div className="flex flex-col items-center justify-center w-fit h-fit">
                                            {selectedImageUpdate ? (
                                                <img
                                                    className="bg-white w-16 h-16  object-contain rounded-full"
                                                    src={selectedImageUpdate}
                                                    alt="Image Preview"
                                                />
                                                ) : (<>
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                </>)
                                            }
                                            </div>
                                            <input accept='image/*' onChange={handleImageChangeUpdate} id="profileImage" type="file" className="hidden"/>
                                        </label>
                                        <button disabled={disableButton} className={`${disableButton?"cursor-not-allowed":""} text-white bg-lightB hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-cyan-950 dark:hover:bg-cyan-700`}>{buttonText.uploadButton}</button>
                                    </form>
                            </div>
                        </div>
                        <div className='mx-2 pb-2 list-none flex flex-col gap-y-2 max-h-60 overflow-y-scroll'>
                            
                        </div>
                    </div>
                </div>
            </div> 
    </>
  )
}

export default ProfileCard

ProfileCard.propTypes = {
    user: PropTypes.object,
    isFollowing: PropTypes.bool,
    followUser: PropTypes.func,
    getUserData: PropTypes.func,
    getPosts: PropTypes.func,
    // avatar: PropTypes.string,
    // userName: PropTypes.string,
    // fullName: PropTypes.string,
    // email: PropTypes.string,
    // location: PropTypes.string,
    // occupation: PropTypes.string,
}