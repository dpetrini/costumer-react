// Other THUNK MW related actions

import * as CostumersActionTypes from '../actiontypes/costumers';

const initialState = {
  costumerData: [
    { firstName: 'João', lastName: 'Pereira', contactNumber: '11 22987 2222', emailAddress: 'joaopereira@gmail.com' },
    { firstName: 'Silvia', lastName: 'Joao', contactNumber: '11 3322 22332', emailAddress: 'silviajoao@gmail.com' },
  ],
  selectedCostumerId: -1, // Selected costumer from list
};

export const costumers = (state = initialState, action) => {
    
  switch (action.type) {

    // ***********  Result from Fetch costumers from database to Costumers component
    // Update from db to state.
    case CostumersActionTypes.ITEMS_FETCH_DATA_SUCCESS: {
        
      console.log('SUCCESS FETCH', action.items);
        
      return {
        ...state,
        costumerData: action.items,
      };
    }
        
    // Sucessfull new costumer posted to database
    case CostumersActionTypes.ITEMS_POST_DATA_SUCCESS: {
              
      console.log('SUCESS POST', action.result);
              
      return {
        ...state,
      };
    }

    // Sucessfull new costumer posted to database
    case CostumersActionTypes.SELECT_COSTUMER: {
      
      console.log('Select Costumer', action.id);
      
      return {
        ...state,
        selectedCostumerId: action.id,
      };
    }

    // Default state: no changes
    default:
      return state;
  }
}
      
export default costumers;
