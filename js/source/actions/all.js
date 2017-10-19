import * as SystemActionTypes from '../actiontypes/all';

export const updateData = data => {
  return {
    type: SystemActionTypes.UPDATE_DATA,
    data,
  };
};

// export const updateSystem = systemData => {
//   return {
//     type: SystemActionTypes.UPDATE_SYSTEM_DATA,
//     systemData,
//   };
// };

export const updateCityHsp = (city) => {
  return {
    type: SystemActionTypes.UPDATE_CITY_HSP,
    city,
  };
};

// export const updateConfig = configData => {
//   return {
//     type: SystemActionTypes.UPDATE_CONFIG_DATA,
//     configData,
//   };
// };

// export const updataOpCost = configData => {
//   return {
//     type: SystemActionTypes.CONFIG_OPCOST,
//     configData,
//   };
// };

export const updateResult = (resultData) => {
  return {
    type: SystemActionTypes.UPDATE_RESULT_DATA,
    resultData, 
  };
};

export const updateBarGraph = () => {
  return {
    type: SystemActionTypes.UPDATE_BAR_GRAPH, 
  };
};

export const updateSelectedResult = (row) => {
  return {
    type: SystemActionTypes.UPDATE_SELECTED_RESULT,
    row, 
  };
};


// export const selectCostumer = costumerData => {
//   return {
//     type: SystemActionTypes.SELECT_COSTUMER,
//     costumerData,
//   };
// };


export const addCostumer = costumerData => {
  return {
    type: SystemActionTypes.ADD_COSTUMER,
    costumerData,
  };
};

export const proposalSent = (name, lastName, sysProposal, timeNow, totalCost, status) => {
  return {
    type: SystemActionTypes.PROPOSAL_SENT,
    name, 
    lastName, 
    sysProposal, 
    timeNow, 
    totalCost, 
    status,
  };
};

// e vamos lá para o MW thunk e essa complexidade para fetch...
// thunk action creators
export function costumerFetchData(url) {
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
      .then((items) => dispatch(itemsFetchDataSuccess(items)))
      .catch(() => dispatch(itemsHasErrored(true)));
  };
}

export const itemsHasErrored = hasErrored => {
  return {
    type: SystemActionTypes.ITEMS_HAS_ERRORED,
    hasErrored,
  };
}

export const itemsIsLoading = (isLoading) => {
  return {
    type: SystemActionTypes.ITEMS_IS_LOADING,
    isLoading: isLoading,
  };
}

export const itemsFetchDataSuccess = items => {
  return {
    type: SystemActionTypes.ITEMS_FETCH_DATA_SUCCESS,
    items,
  };
};


// Send Costumer data to server

export function costumerPostData(url, data) {
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
          dispatch(itemsPostDataSuccess(response.statusText))

          // Fetches  again to update Costumer list in UI safely
          costumerFetchData(url)

        } else {
          dispatch(itemsHasErrored(true));
        }

        // console.log(response)
        return;// response;
      })
      // .then((response) => response.json())
      // .then((response) => dispatch(itemsPostDataSuccess(response)))
      .catch(() => dispatch(itemsHasErrored(true)));
  };
}


export const itemsPostDataSuccess = result => {
  return {
    type: SystemActionTypes.ITEMS_POST_DATA_SUCCESS,
    result,
  };
};

// Login
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

        // console.log(response)
        return;// response;
      })
      // .then((response) => response.json())
      // .then((response) => dispatch(itemsPostDataSuccess(response)))
      .catch(() => dispatch(itemsHasErrored(true)));
  };
}

//Logout
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

//Sign UP


// export const SIGNUP_SUCCESS = 'signup/SIGNUP_SUCCESS'
// export const SIGNUP_FAILURE = 'login/SIGNUP_FAILURE'
