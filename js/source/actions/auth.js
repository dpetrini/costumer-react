import * as SystemActionTypes from '../actiontypes/auth';

// Login Actions
export const loginSuccess = result => {
  return {
    type: SystemActionTypes.LOGIN_SUCCESS,
    result,
  };
};
  
export const loginNoFound = result => {
  return {
    type: SystemActionTypes.LOGIN_NOTFOUND,
    result,
  };
};
  
export function loginPostData(url, data) {
  return (dispatch) => {
    dispatch(itemsIsLoading(true));
      
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // this.state
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(itemsIsLoading(false));
          
        if (response.statusText === 'OK') {
          dispatch(loginSuccess(response.statusText))
  
        } else {
          dispatch(loginNoFound(true));
        }
  
        return;// response;
      })
    // .then((response) => response.json())
    // .then((response) => dispatch(itemsPostDataSuccess(response)))
      .catch(() => dispatch(itemsHasErrored(true)));
  };
}
  
//Logout Actions
export const logoutSuccess = result => {
  return {
    type: SystemActionTypes.LOGOUT_SUCCESS,
    result,
  };
};
  
export const logoutError = result => {
  return {
    type: SystemActionTypes.LOGOUT_ERROR,
    result,
  };
};
  
export function logoutPostData(url) {
  return (dispatch) => {
    dispatch(itemsIsLoading(true));
  
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(itemsIsLoading(false));
        return response;
      })
      .then((response) => response.json())
      .then((items) => dispatch(logoutSuccess(items)))
      .catch(() => dispatch(logoutError(true)));
  };
}
  
const itemsHasErrored = hasErrored => {
  return {
    type: SystemActionTypes.ITEMS_HAS_ERRORED,
    hasErrored,
  };
}
  
const itemsIsLoading = (isLoading) => {
  return {
    type: SystemActionTypes.ITEMS_IS_LOADING,
    isLoading: isLoading,
  };
}

//Sign UP Actions: TODO
  