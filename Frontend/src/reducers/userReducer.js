import { CLEAR_ERRORS, GET_IMAGES_FAILURE, GET_IMAGES_REQUEST, GET_IMAGES_SUCCESS, IMAGE_FAILURE, IMAGE_REQUEST, IMAGE_RESET, IMAGE_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS } from '../constants/userConstants'

export const UserReducer = (state = {user:{}},action) =>{
switch(action.type){
    case LOGIN_REQUEST:
    case REGISTER_USER_REQUEST:
    case LOAD_USER_REQUEST:
        return{
            loading:true,
            isAuthenticated:false,
        }        
    case LOGIN_SUCCESS:
    case REGISTER_USER_SUCCESS:
    case LOAD_USER_SUCCESS:
        return{
            ...state,
            loading:false,
            isAuthenticated:true,
            user:action.payload,
        }            
    case LOGIN_FAIL:
    case REGISTER_USER_FAIL:    
        return{
            ...state,
            loading:false,
            isAuthenticated:false,
            user:null,
            error:action.payload
        }  
    case LOGOUT_SUCCESS:
        return{
                isAuthenticated:false,
                user:null,
                loading:false,
            }
    case LOGOUT_FAIL:
        return{
            ...state,
            loading:false,
            error:action.payload,
        }     
    case CLEAR_ERRORS:
        return{
            ...state,
            error:null,
        }  
    case LOAD_USER_FAIL :
        return{
            loading:false,
            isAuthenticated:false,
            user:null,
            error:action.payload,
        }        
    default:
        return state;   
                        
}
}

const initialState = {
    user: {},
    loading: false,
    error: null,
    isUploaded:false,
  };

export const ImageReducer = (state = initialState,action) =>{
    switch (action.type) {
        case IMAGE_REQUEST:
          return {
            ...state,
            loading: true,
            error: null
          };
        case IMAGE_SUCCESS:
          return {
            ...state,
            loading: false,
            user: action.payload,
            error: null,
            isUploaded:true,
          };
        case IMAGE_FAILURE:
          return {
            ...state,
            loading: false,
            error: action.payload
          };

        case IMAGE_RESET:
            return{
                ...state,
                loading:false,
                error:null,
                isUploaded:false,
            }  
        default:
          return state;
      }
    
}

const initialState2 = {
    images: [],
    loading: false,
    error: null
  };
export const getUserImages = (state = initialState2,action) =>{
    switch (action.type) {
        case GET_IMAGES_REQUEST:
          return {
            ...state,
            loading: true,
            error: null
          };
    
        case GET_IMAGES_SUCCESS:
          return {
            ...state,
            loading: false,
            images: action.payload, // Update images array with the fetched images
            error: null
          };
    
        case GET_IMAGES_FAILURE:
          return {
            ...state,
            loading: false,
            error: action.payload // Set error message in case of failure
          };
    
        default:
          return state;
}
}