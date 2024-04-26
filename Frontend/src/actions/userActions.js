import axios from 'axios'
import { server } from '../main'
import { CLEAR_ERRORS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS } from '../constants/userConstants'


export const login =(email,password) => async(dispatch)=>{
    try {
        dispatch({type:LOGIN_REQUEST});
        const config = {
            headers:{"Content-Type":"application/json"},
            withCredentials:true,
        };
        const {data} = await axios.post(`${server}/users/login`,{email,password},config);

        dispatch({type:LOGIN_SUCCESS,payload:data.user});
    } catch (error) {
        dispatch({type:LOGIN_FAIL,payload:"Error in client side inside login action"});
    }
}

export const clearErrors=() =>async(dispatch)=>{
    dispatch({type: CLEAR_ERRORS}); 
}

export const signup=(userData)=>async(dispatch)=>{
    try {
        dispatch({type:REGISTER_USER_REQUEST})
    
        const config = { headers:{"Content-Type":"multipart/form-data"},
        withCredentials:true, };
    
        const {data} = await axios.post(`${server}/users/signup`,userData,config);
    
        dispatch({type:REGISTER_USER_SUCCESS,payload:data.user});
    
    } catch (error) {
        console.log(error);
        dispatch({type:REGISTER_USER_FAIL,payload:error.response.data.message});
    }
}

export const logout = () => async(dispatch)=>{
    try {
        const {data} = await axios.get(`${server}/users/logout`,{
            withCredentials:true,
        });
        dispatch({type:LOGOUT_SUCCESS});
    } catch (error) {
        dispatch({type:LOGIN_FAIL,payload:error.response.data.message});
    }
}

export const loadUser =() => async(dispatch)=>{
    try {
        dispatch({type:LOAD_USER_REQUEST});

        const {data} = await axios.get(`${server}/users/me`,{
            withCredentials:true,                   
          });
        {console.log("Here is the user -> ",data.user)}

        dispatch({type:LOAD_USER_SUCCESS,payload:data.user});

    } catch (error) {
        dispatch({type:LOAD_USER_FAIL,payload:error.response.data.message});
    }
}
