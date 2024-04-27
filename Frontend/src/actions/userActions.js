import axios from 'axios'
import { server } from '../main'
import { CLEAR_ERRORS, GET_IMAGES_FAILURE, GET_IMAGES_REQUEST, GET_IMAGES_SUCCESS, IMAGE_FAILURE, IMAGE_REQUEST, IMAGE_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS } from '../constants/userConstants'


export const login =({email,password}) => async(dispatch)=>{
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

export const signup=({name,email,password})=>async(dispatch)=>{
    try {
        dispatch({type:REGISTER_USER_REQUEST})
    
        const config = { headers:{"Content-Type":"application/json"},
        withCredentials:true, };
    
        const {data} = await axios.post(`${server}/users/signup`,{name,email,password},config);
    
        dispatch({type:REGISTER_USER_SUCCESS,payload:data.user});
    
    } catch (error) {
        console.log(error);
        dispatch({type:REGISTER_USER_FAIL,payload:error.response?.data?.message});
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
        dispatch({type:LOAD_USER_FAIL,payload:error.response?.data?.message});
    }
}

export const uploadImage = (imageData) => async(dispatch)=>{
    try {
        dispatch({type:IMAGE_REQUEST});
        
        const config = { headers:{"Content-Type":"multipart/form-data"},
        withCredentials:true, };

        const {data} = await axios.post(`${server}/users/uploadImage`,imageData,config);
        
        dispatch({type:IMAGE_SUCCESS,payload:data.user});

    } catch (error) {
        dispatch({type:IMAGE_FAILURE,payload:error.response?.data?.message});
    }
}

export const getImages = () =>async(dispatch)=>{
 try {
    dispatch({type:GET_IMAGES_REQUEST})
    const {data} = await axios.get(`${server}/users/userImages`,{
        withCredentials:true,                   
      });
    {console.log("Here is the user -> ",data.images)}
    dispatch({type:GET_IMAGES_SUCCESS,payload:data.images})
 } catch (error) {
    dispatch({type:GET_IMAGES_FAILURE,payload:error.response?.data?.message})
 }


}