import { Image, MapPin, MapPinOff } from 'lucide-react'
import {useContext, useRef, useState} from 'react'
import PropTypes from "prop-types"
import Compressor from 'compressorjs'

import Spinner from './Spinner'
import alertContext from '../context/alertContext'
import Alert from './Alert'

const UploadPostCard = (props) => {
    const context = useContext(alertContext)
    const {alert,showAlert} = context
    const uploadForm = useRef(null)

    const [uploadImage, setUploadImage] = useState(false)
    const [addLocation, setAddLocation] = useState(false)
    const [processing, setProcessing] = useState(false)
    const [buttonText, setButtonText] = useState("Upload post")
    const [postData, setPostData] = useState({postText:"",location:""})
    const [postImage, setPostImage] = useState("")
    const [selectedImage, setSelectedImage] = useState(null)


    const uploadPostSubmit = async(e)=>{
        e.preventDefault()
        setProcessing(true)
        try{
            setButtonText("Posting..")
            const formData = new FormData()
            formData.append('postText', postData.postText)
            if (addLocation) formData.append('location', postData.location)
            if (uploadImage) formData.append('postImage', postImage)

            const response = await fetch(import.meta.env.VITE_BACKEND_URL+"/posts/uploadPost",{
                method:'POST',
                credentials: 'include',
                body:formData
            })
            const json = await response.json()
            if(json.success){
                showAlert(json.success,json.message)
                setPostData({postText:"",location:""})
                props.getPosts()
            }
            else{
                showAlert(json.success,json.message)
            }
            setSelectedImage(null)
            uploadForm.current.reset()
            setAddLocation(false)
            setUploadImage(false)
            setProcessing(false)
            setButtonText("Upload post")
        }catch(error){
            console.log(error)
        }
    }

    const handleChange=(e)=>{
        setPostData({
            ...postData,[e.target.id]:e.target.value
        })
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        // handler if user selects other file than image/*
        if (!file.type.startsWith('image/')) {
            showAlert(false,"Please select an image file (e.g., PNG, JPG, GIF).")
            event.target.value = null // Reset the input value to clear the selected file
            return
        }

        // if not gif file then compress the image
        if (!file.type.includes('gif')){
            new Compressor(file, {
                quality: 0.8, 
                success: (compressedResult) => {       
                  setPostImage(compressedResult)
                },
            })
        }else
            setPostImage(file) 
        
        const reader = new FileReader()
        reader.onloadend = () => {
          setSelectedImage(reader.result)
        };
      
        if (file) 
          reader.readAsDataURL(file)
    }
      

    return (
        <>
            <Alert alert={alert}/>
            <div className="divide-y divide-gray-700 w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700">        
                <form ref={uploadForm} onSubmit={uploadPostSubmit} encType='multipart/form-data'>
                    <div className='flex flex-col'>
                        <div className='flex flex-row items-center mb-2'>
                            <img className="w-14 h-14 rounded-full ring-2 ring-lightB" src={props.avatar?props.avatar:"https://res.cloudinary.com/dg7etzwks/image/upload/v1689588259/extras/userIcon_dhf5ym.png"} alt=""/>
                            <div className="w-full ml-2">
                                <input type="text" id="postText" onChange={handleChange} value={postData.postText} placeholder={`What's on your mind....`} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                            </div>
                        </div> 
                            <div className="w-full ml-2 mt-1 mb-2 flex flex-row items-center gap-2 text-gray-400">
                                <div onClick={()=>{addLocation?setAddLocation(false):setAddLocation(true)}}>
                                    {
                                        addLocation?<MapPinOff/>:<MapPin/>
                                    }
                                </div>
                                {
                                    addLocation?
                                    <input type="text" id="location" onChange={handleChange} value={postData.location} placeholder={`Add a location...`} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-full  block w-auto py-1.5 px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required={addLocation} />:
                                    <span className='text-sm font-semibold text-gray-500'>Location</span>
                                }    
                            </div>
                        {uploadImage &&                     
                            <div className="flex items-center justify-center w-full mb-2">
                                <label htmlFor="postImage" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    {selectedImage ? (
                                        <img
                                            className="w-auto h-24 mb-4 object-contain"
                                            src={selectedImage}
                                            alt="Image Preview"
                                        />
                                        ) : (<>
                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                        </>)
                                    }
                                    </div>
                                    <input accept='image/*' onChange={handleImageChange} id="postImage" type="file" className="hidden"/>
                                </label>
                            </div>                        
                        }
                    </div>
                    <div className='pt-2 flex flex-row justify-between text-gray-500  divide-x divide-gray-700'>
                        <div onClick={()=>{uploadImage?setUploadImage(false):setUploadImage(true)}} className='flex flex-row gap-2 items-center content-center'>
                            <Image/>
                            <span className='text-sm font-semibold'>Image</span>
                        </div>
                        <div className='pl-2'>
                            <button disabled={processing} className={`${processing?"cursor-not-allowed":""} w-full flex flex-wrap text-lightB hover:text-white font-medium rounded-full text-sm px-5 py-2.5 dark:bg-cyan-950 dark:hover:bg-cyan-700 dark:focus:ring-white dark:border-white`}>{processing && <Spinner size={"4"}/>}{buttonText}</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default UploadPostCard

UploadPostCard.propTypes = {
    avatar: PropTypes.string,
    getPosts: PropTypes.func,
}