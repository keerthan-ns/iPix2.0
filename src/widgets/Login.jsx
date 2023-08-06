import {useState,useEffect} from 'react'
import { Button, Label, TextInput } from 'flowbite-react'
import PropTypes from "prop-types"
import { Eye,EyeOff } from 'lucide-react'

import Spinner from './Spinner'
import { useDispatch } from 'react-redux'
import { setIsAuth } from '../state'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {

    let navigate = useNavigate()
    const [credentials, setCredentials] = useState({emailOrUsername:"thor",password:"thor1234"})
    const [logging, setLogging] = useState(false)
    const [isPassword, setIsPassword] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        setLogging(false)
    }, [])

    const handleSubmit=async (e)=>{
        setLogging(true)
        e.preventDefault()
        
        const response = await fetch(import.meta.env.VITE_BACKEND_URL+"/api/auth/login",{
            method:'POST',
            headers:{
                'Content-type':'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({emailOrUsername: credentials.emailOrUsername,password: credentials.password})
        })
        const json = await response.json()
        if(json.success){
            dispatch(setIsAuth({isAuth:true}))
            navigate("/")
            // console.log(json.message)//replace with custom alert box
            props.showAlert(json.success,json.message)
        }
        else{
            console.log("ERROR:"+json.message)     
            props.showAlert(json.success,json.message)
        }
        setLogging(false)
    }

    const handleChange=(e)=>{
        setCredentials({
        ...credentials,[e.target.id]:e.target.value
        })
    }
  
  return (
    <>
      <div className="mt-4 px-2 w-full">
            <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-4 px-6 py-8 rounded-xl border-2 border-sky-500/50 bg-gray-800 backdrop-blur">
                <h1 className="text-2xl font-bold text-pink-500 after:content-['_back!!']">
                    <span className="underline underline-offset-8 decoration-7 decoration-lightB">
                        Welcome
                    </span>
                </h1>
                <div>
                    <div className="mb-2 block">
                        <Label className='text-white' htmlFor="emailOrUsername" value="Enter username or email" />
                    </div>
                    <TextInput onChange={handleChange} value={credentials.emailOrUsername} className='w-full' id="emailOrUsername" name="emailOrUsername" placeholder="name@ipix.com or john_wick" required type="text" />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label className='text-white' htmlFor="password" value="Your password" />
                    </div>
                    <div className="flex">
                        <input type={`${isPassword ? 'password' : 'text'}`} onChange={handleChange} value={credentials.password} id="password" name="password" className="rounded-none rounded-l-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="********"/>
                        <span onClick={()=>{isPassword?setIsPassword(false):setIsPassword(true)}} className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            {isPassword?<Eye size={20} color="#ffffff" className='m-auto p-0'/>:<EyeOff size={20} color="#ffffff" />}
                        </span>
                    </div>
                </div>
                <Button type="submit" className="mt-2 bg-lightB border-none text-gray-950">
                    {logging && <Spinner size={"4"}/>}Login
                </Button>
                <p onClick={()=>{props.setShowLogin(false)}} className='text-blue-300'>Don&apos;t have an account?</p>
            </form>
        </div>
    </>
  )
}

export default Login

Login.propTypes = {
    setShowLogin: PropTypes.func,
    showAlert: PropTypes.func,
}