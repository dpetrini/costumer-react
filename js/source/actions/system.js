import * as SystemActionTypes from '../actiontypes/system';

// Used to configure in app initial load and after proposal cycle
export const initApp = data => {
  return {
    type: SystemActionTypes.INIT_APP,
    data,
  };
};

// Update user changed values in UI - asl calculations - Actions
export const updateData = data => {
  return {
    type: SystemActionTypes.UPDATE_DATA,
    data,
  };
};

export const updateResult = (resultData) => {
  return {
    type: SystemActionTypes.UPDATE_RESULT_DATA,
    resultData, 
  };
};

// Update HSP value in UI (select)
export const updateCityHsp = (city) => {
  return {
    type: SystemActionTypes.UPDATE_CITY_HSP,
    city,
  };
};

// Update selected result (radio button and BAR gaph in UI) Actions
export const updateSelectedResult = (row) => {
  return {
    type: SystemActionTypes.UPDATE_SELECTED_RESULT,
    row, 
  };
};

export const updateBarGraph = () => {
  return {
    type: SystemActionTypes.UPDATE_BAR_GRAPH, 
  };
};

// // Add new costumer Action
// export const addCostumer = costumerData => {
//   return {
//     type: SystemActionTypes.ADD_COSTUMER,
//     costumerData,
//   };
// };

// // Response Action to proposal button clicked
// // export const proposalSent = (name, lastName, sysProposal, timeNow, totalCost, status) => {
// //   return {
// //     type: SystemActionTypes.PROPOSAL_SENT,
// //     name, 
// //     lastName, 
// //     sysProposal, 
// //     timeNow, 
// //     totalCost, 
// //     status,
// //   };
// // };

// // e vamos lá para o MW thunk e essa complexidade para fetch...
// // thunk action creators
// // Reads Costumer data from server
// export function costumerFetchData(url) {
//   return (dispatch) => {
//     dispatch(itemsIsLoading(true));

//     fetch(url)
//       .then((response) => {
//         if (!response.ok) {
//           throw Error(response.statusText);
//         }
//         dispatch(itemsIsLoading(false));
//         return response;
//       })
//       .then((response) => response.json())
//       .then((items) => dispatch(itemsFetchDataSuccess(items)))
//       .catch(() => dispatch(itemsHasErrored(true)));
//   };
// }

// export const itemsHasErrored = hasErrored => {
//   return {
//     type: SystemActionTypes.ITEMS_HAS_ERRORED,
//     hasErrored,
//   };
// }

// export const itemsIsLoading = (isLoading) => {
//   return {
//     type: SystemActionTypes.ITEMS_IS_LOADING,
//     isLoading: isLoading,
//   };
// }

// export const itemsFetchDataSuccess = items => {
//   return {
//     type: SystemActionTypes.ITEMS_FETCH_DATA_SUCCESS,
//     items,
//   };
// };

// // Send Costumer data to server
// export function costumerPostData(url, data) {
//   return (dispatch) => {
//     dispatch(itemsIsLoading(true));
    
//     fetch(url, {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data), // this.state
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw Error(response.statusText);
//         }

//         dispatch(itemsIsLoading(false));
        
//         if (response.statusText === 'OK') {
//           dispatch(itemsPostDataSuccess(response.statusText))
//           // Fetches  again to update Costumer list in UI safely
//           costumerFetchData(url)
//         } else {
//           dispatch(itemsHasErrored(true));
//         }

//         return;
//       })
//       .catch(() => dispatch(itemsHasErrored(true)));
//   };
// }

// export const itemsPostDataSuccess = result => {
//   return {
//     type: SystemActionTypes.ITEMS_POST_DATA_SUCCESS,
//     result,
//   };
// };

// // Proposal sending Actions
// export const proposalSendSuccess = result => {
//   return {
//     type: SystemActionTypes.PROPOSAL_SEND_SUCCESS,
//     result,
//   };
// };

// export const proposalSendFail = result => {
//   return {
//     type: SystemActionTypes.PROPOSAL_SEND_FAIL,
//     result,
//   };
// };

// export function proposalPostData(url, data) {
//   return (dispatch) => {
//     dispatch(itemsIsLoading(true));
    
//     fetch(url, {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data), // this.state
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw Error(response.statusText);
//         }

//         dispatch(itemsIsLoading(false));
        
//         if (response.statusText === 'OK') {
//           dispatch(proposalSendSuccess(response.statusText))
//         } else {
//           dispatch(proposalSendFail(true));
//         }

//         return;
//       })
//       .catch(() => dispatch(itemsHasErrored(true)));
//   };
// }

// // Reads Costumer data from server
// export function proposalGetData(url) {
//   return (dispatch) => {
//     dispatch(itemsIsLoading(true));

//     fetch(url)
//       .then((response) => {
//         if (!response.ok) {
//           throw Error(response.statusText);
//         }
//         dispatch(itemsIsLoading(false));
//         return response;
//       })
//       .then((response) => response.json())
//       .then((items) => dispatch(proposalGetDataSuccess(items)))
//       .catch(() => dispatch(itemsHasErrored(true)));
//   };
// }

// export const proposalGetDataSuccess = result => {

//   return {
//     type: SystemActionTypes.PROPOSAL_GET_DATA_SUCESS,
//     result,
//   };
// };


