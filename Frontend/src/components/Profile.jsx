import { clearErrors, loadUser } from '@/actions/userActions';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {error,isAuthticated,loading,user} = useSelector(state => state.user);

    useEffect(()=>{
        if(user == null) navigate('/login');
        if(!isAuthticated){
            navigate("/login");
        }
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
    },[user,isAuthticated,navigate]);

  return (
    <>
    {loading ? (<h1> Loading....... </h1>):(
        <div className='pt-[80px]'>
            <h2>{user.name}</h2>
            <h2>{user.email}</h2>
            <h4>Joined On</h4>
            <p>{String(user.createdAt).substr(0,10)}</p>
        </div>
    )}
    </>
  )
}

export default Profile