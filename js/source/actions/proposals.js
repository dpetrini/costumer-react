import * as SystemActionTypes from '../actiontypes/proposals';

// Proposal sending Actions
export const proposalSendSuccess = result => {
  return {
    type: SystemActionTypes.PROPOSAL_SEND_SUCCESS,
    result,
  };
};
  
export const proposalSendFail = result => {
  return {
    type: SystemActionTypes.PROPOSAL_SEND_FAIL,
    result,
  };
};
  
export function proposalPostData(url, data) {
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
          dispatch(proposalSendSuccess(response.statusText))
        } else {
          dispatch(proposalSendFail(true));
        }
  
        return;
      })
      .catch(() => dispatch(itemsHasErrored(true)));
  };
}
  
// Reads Costumer data from server
export function proposalGetData(url) {
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
      .then((items) => dispatch(proposalGetDataSuccess(items)))
      .catch(() => dispatch(itemsHasErrored(true)));
  };
}
  
export const proposalGetDataSuccess = result => {
  
  return {
    type: SystemActionTypes.PROPOSAL_GET_DATA_SUCESS,
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
