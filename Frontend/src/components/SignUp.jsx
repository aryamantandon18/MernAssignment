import React, { useEffect, useState } from 'react'
import { MdOutlineEmail } from "react-icons/md";
import { MdLockOpen } from "react-icons/md";
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { BsMicrosoft } from "react-icons/bs";
import { clearErrors, signup } from '@/actions/userActions';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';


const SignUp = () => {
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [name,setName] = useState("");
  const [password,setPassword] = useState();
  const dispatch = useDispatch();
  const {error,isAuthenticated,loading} = useSelector(state => state.user);

  const HandleSubmit = (e)=>{
    e.preventDefault();
    console.log(name, email , password);

    try {
      dispatch(signup({name,email,password}));
      toast.success("Signup Successful");
    } catch (error) {
      console.error("Axios Error:", error);
      if (error.response) {
        console.error("Response Data:", error.response.data);
        console.error("Response Status:", error.response.status);
      }
      toast.error("Error occurred during signup");
    }
  }

  const HandleChange =(e)=>{
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  }

  useEffect(()=>{
    if(isAuthenticated){
      navigate('/');
    }
    if(error){
      toast.error(error);
      dispatch(clearErrors());
    }
  },[error,isAuthenticated,dispatch])

  return (
    <div className='pt-[80px] flex items-center justify-center h-screen'>
        <form on onSubmit={HandleSubmit} className='w-full lg:w-[40%] 2xl:w-[23vw] h-[60vh] p-10 m-2 border rounded-lg shadow-lg flex flex-col gap-8'>
            <p className='text-2xl md:text-3xl lg:text-4xl mb-3 text-center font-medium font-sans hover:text-blue-500 hover:scale-105 transition-all delay-80 cursor-default'>SignUp Here</p>
            <div className='flex flex-col justify-start '>
            <p className='m-1 flex items-center'>
            <MdOutlineEmail  className='absolute text-xl ml-[5%] lg:ml-[1%] text-gray-800'/>
              <input value={name} onChange={HandleChange} id="email" type='text' placeholder='Enter name' name='name' className='w-[100%] h-[50px]  border-blue-500 rounded-xl border-2 p-6 pl-12 shadow-md shadow-blue-200'/></p>
            </div>
            <div className='flex flex-col justify-start '>
            <p className='m-1 flex items-center'>
            <MdOutlineEmail  className='absolute text-xl ml-[5%] lg:ml-[1%] text-gray-800'/>
              <input value={email} onChange={HandleChange} id="email" type='text' placeholder='Enter Email' name='email' className='w-[100%] h-[50px]  border-blue-500 rounded-xl border-2 p-6 pl-12 shadow-md shadow-blue-200'/></p>
            </div>
            <div className='flex flex-col justify-start '>
            <p className='m-1 flex items-center'>
            <MdLockOpen className='absolute text-xl ml-[5%] lg:ml-[1%] text-gray-800'/>
              <input value={password} onChange={HandleChange} id="password" type='password' placeholder='Enter password' name='password' className='w-[100%] h-[50px]  border-blue-500 rounded-xl border-2 p-6 pl-12 shadow-md shadow-blue-200' autoComplete='off'/></p>
              {password && 
        password.length<8 ? (<p class="text-red-500 text-xs italic pl-2">Please choose a password.</p>) :("") }
            </div>
            <div className='flex justify-between items-baseline'>  <Button className="ml-2 text-md w-[40%]">Signup</Button>
           <Link className='text-sm md:text-md hover:font-medium' to={"/login"}>Already a member?   </Link></div>
           <p className='w-full border-t-[3px]'></p>
           <div className='flex gap-10 items-center justify-center text-3xl'><FcGoogle className='hover:scale-110'/> <FaGithub className='hover:scale-110'/><BsMicrosoft className='hover:scale-110'/></div>
        </form>
    </div>
  )
}

export default SignUp