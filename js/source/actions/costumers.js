import * as SystemActionTypes from '../actiontypes/costumers';

// Add new costumer Action
export const selectCostumerId = id => {
  return {
    type: SystemActionTypes.SELECT_COSTUMER,
    id,
  };
};
  
// e vamos lá para o MW thunk e essa complexidade para fetch...
// thunk action creators
// Reads Costumer data from server
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
  
        return;
      })
      .catch(() => dispatch(itemsHasErrored(true)));
  };
}
  
export const itemsPostDataSuccess = result => {
  return {
    type: SystemActionTypes.ITEMS_POST_DATA_SUCCESS,
    result,
  };
};

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
