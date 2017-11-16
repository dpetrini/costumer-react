import * as AuthActionTypes from '../actiontypes/auth';

export const authorized = (state = { authorized: false }, action) => {
    
  switch (action.type) {
    // Result actions in return of fetch operations (middleware thunk)
    // *********** Login result OK: authorized
    case AuthActionTypes.LOGIN_SUCCESS: {
          
      console.log('SUCCESS LOGIN', action.result);
          
      return {
        ...state,
        authorized: true,
      };
    }
    
    // Login failed
    case AuthActionTypes.LOGIN_NOTFOUND: {
          
      console.log('LOGIN NOT FOUND', action.result);
          
      return {
        ...state,
        authorized: false,
      };
    }    
    
    // Logout successfull
    case AuthActionTypes.LOGOUT_SUCCESS: {
          
      console.log('SUCESS LOGOUT', action.result);
          
      return {
        ...state,
        authorized: false,
      };
    }
    
    // Logout failed
    case AuthActionTypes.LOGOUT_ERROR: {
          
      console.log('LOGOUT ERROR', action.result);
          
      return {
        ...state,
        authorized: false,
      };
    } 
    
    // Default state: no changes
    default:
      return state;
  }
}

export default authorized;
