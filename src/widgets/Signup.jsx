import {useState,useEffect} from 'react'
import { Button, Label, TextInput } from 'flowbite-react'
import PropTypes from "prop-types"
import { Eye,EyeOff } from 'lucide-react'

import Spinner from './Spinner'

const Signup = (props) => {
    const [signing, setSigning] = useState(false)
    const [isPassword, setIsPassword] = useState(true)
    const [credentials, setCredentials] = useState({uname:"",email:"",password:""})

    useEffect(() => {
        setSigning(false)
    }, [])

    const handleSubmit=async (e)=>{
        setSigning(true)
        e.preventDefault()
        const response = await fetch(import.meta.env.VITE_BACKEND_URL+"/api/auth/register",{
            method:'POST',
            headers:{
                'Content-type':'application/json',
            },
            body: JSON.stringify({uname:credentials.uname,email: credentials.email,password: credentials.password})
        })
        const json = await response.json()
        if(json.success){
            console.log(json.message)
            props.setShowLogin(true)
            // props.showAlert("Success",json.message)
        }
        else{
            console.log("Error",json.message)
            // props.showAlert("Error",json.message)
        }
        setSigning(false)
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
                <h1 className="text-2xl font-bold text-pink-500 after:content-['_signup']">
                    <span className="underline underline-offset-8 decoration-7 decoration-lightB">
                        iPix
                    </span>
                </h1>
                <div>
                    <div className="mb-2 block">
                        <Label className='text-white' htmlFor="uname" value="Enter an username" />
                    </div>
                    <TextInput onChange={handleChange} value={credentials.uname} minLength={3} className='w-full' id="uname" name="uname" placeholder="JohnWick" required type="text" />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label className='text-white' htmlFor="email" value="Enter an email" />
                    </div>
                    <TextInput onChange={handleChange} value={credentials.email} className='w-full' id="email" name="email" placeholder="name@ipix.com" required type="email" />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label className='text-white' htmlFor="password" value="Create a password" />
                    </div>
                    <div className="flex">
                        <input onChange={handleChange} value={credentials.password} minLength={6} type={`${isPassword ? 'password' : 'text'}`} id="password" name="password" className="rounded-none rounded-l-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="********"/>
                        <span onClick={()=>{isPassword?setIsPassword(false):setIsPassword(true)}} className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            {isPassword?<Eye size={20} color="#ffffff" className='m-auto p-0'/>:<EyeOff size={20} color="#ffffff" />}
                        </span>
                    </div>
                </div>
                <Button type="submit" className="mt-2 bg-lightB border-none text-gray-950">
                    {signing && <Spinner size={"4"}/>}Sign Up
                </Button>
                <p onClick={()=>{props.setShowLogin(true)}} className='text-blue-300'>Have an account already?</p>
            </form>
        </div>
    </>
  )
}

export default Signup
Signup.propTypes = {
    setShowLogin: PropTypes.func,
}