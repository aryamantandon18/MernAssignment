import React, { useEffect, useRef, useState } from 'react'
import { MdOutlineEmail } from "react-icons/md";
import { MdLockOpen } from "react-icons/md";
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login } from '@/actions/userActions';
import toast from 'react-hot-toast';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { BsMicrosoft } from 'react-icons/bs';


const Login = () => {
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState();
  const dispatch = useDispatch();
  const {error,isAuthenticated,loading} = useSelector(state => state.user);

  const HandleSubmit = (e)=>{
    e.preventDefault();
    console.log(email , password);
    dispatch(login({email,password}));
    toast.success("LoggedIn successfully")
  }
  const HandleChange =(e)=>{
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
  }


  useEffect(()=>{
    if(isAuthenticated){
      navigate('/');
    }
    if(error){
      toast.error(error);
      dispatch(clearErrors());
    }
  },[error,isAuthenticated,dispatch,navigate])

  return (
    <div className='pt-[80px] flex items-center justify-center h-screen'>
        <form onSubmit={HandleSubmit} className='w-full lg:w-[40%] 2xl:w-[23vw] h-[60vh] p-10 m-2 border rounded-lg shadow-lg flex flex-col gap-9'>
            <p className='text-2xl md:text-3xl lg:text-4xl mb-3 text-center font-medium font-sans hover:text-blue-500 hover:scale-105 transition-all delay-80 cursor-default'>Login Here</p>
            <div className='flex flex-col justify-start '>
            <label className='text-lg mb-2 font-semibold '>Email</label>
            <p className='m-1 flex items-center'>
            <MdOutlineEmail  className='absolute text-xl ml-[5%] lg:ml-[1%] text-gray-800'/>
              <input value={email} onChange={HandleChange} id="email" type='text' placeholder='Enter Email' name='email' className='w-[100%] h-[50px]  border-blue-500 rounded-xl border-2 p-6 pl-12 shadow-md shadow-blue-200'/></p>
            </div>
            <div className='flex flex-col justify-start '>
            <label className='text-lg mb-2 font-semibold '>Password</label>
            <p className='m-1 flex items-center'>
            <MdLockOpen className='absolute text-xl ml-[5%] lg:ml-[1%] text-gray-800'/>
              <input value={password} onChange={HandleChange} id="password" type='password' placeholder='Enter password' name='password' className='w-[100%] h-[50px]  border-blue-500 rounded-xl border-2 p-6 pl-12 shadow-md shadow-blue-200' autoComplete='off'/></p>
              {password && password.length && 
        password.length<8 ? (<p class="text-red-500 text-xs italic pl-2">Please choose a password.</p>) :("") }
            </div>
            <div className='flex justify-between items-baseline'>  <Button className="text-md w-[40%]">Login</Button>
           <Link className='hover:font-medium'>forgot password?</Link></div>
           <p className='w-full border-t-[3px]'></p>
           <div className='flex gap-10 items-center justify-center text-3xl '><FcGoogle className='hover:scale-110 cursor-pointer'/> <FaGithub className='hover:scale-110 cursor-pointer'/><BsMicrosoft className='hover:scale-110 cursor-pointer'/></div>
           <div className='flex'></div>
        </form>
    </div>
  )
}

export default Login