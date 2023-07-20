import {useState,useEffect} from 'react'
import { Button, Label, TextInput } from 'flowbite-react'
import PropTypes from "prop-types"
import { Eye,EyeOff } from 'lucide-react'

import Spinner from './Spinner'

const Login = (props) => {
  const [logging, setLogging] = useState(false)
  const [isPassword, setIsPassword] = useState(true)
  useEffect(() => {
    setLogging(false)
  }, [])
  
  return (
    <>
      <div className="mt-4 px-2">
            <form className="mx-auto flex max-w-md flex-col gap-4 px-6 py-8 rounded-xl border-2 border-sky-500/50 bg-gray-800 backdrop-blur">
                <h1 className="text-2xl font-bold text-pink-500 after:content-['_back!!']">
                    <span className="underline underline-offset-8 decoration-7 decoration-[#00D5FA]">
                        Welcome
                    </span>
                </h1>
                <div>
                    <div className="mb-2 block">
                        <Label className='text-white' htmlFor="email" value="Your email" />
                    </div>
                    <TextInput className='w-full' id="email" name="email" placeholder="name@ipix.com" required type="email" />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label className='text-white' htmlFor="password" value="Your password" />
                    </div>
                    <div className="flex">
                        <input type={`${isPassword ? 'password' : 'text'}`} id="password" name="password" className="rounded-none rounded-l-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="********"/>
                        <span onClick={()=>{isPassword?setIsPassword(false):setIsPassword(true)}} className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            {isPassword?<Eye size={20} color="#ffffff" className='m-auto p-0'/>:<EyeOff size={20} color="#ffffff" />}
                        </span>
                    </div>
                </div>
                <Button type="submit" className="mt-2 bg-[#00D5FA] border-none text-gray-950">
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
}