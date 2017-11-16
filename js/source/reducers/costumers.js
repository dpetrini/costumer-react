// Other THUNK MW related actions

import * as CostumersActionTypes from '../actiontypes/costumers';

const initialState = {
  costumerData: [
    ['João', 'Pereira', '11 22987 2222', 'joaopereira@gmail.com', ''],
    ['Silvia', 'Joao', '11 3322 22332', 'silviajoao@gmail.com', ''],
  ],
  selectedCostumer: -1, // Selected costumer from list
};

export const costumers = (state = initialState, action) => {
    
  switch (action.type) {

    // ***********  Result from Fetch costumers from database to Costumers component
    // Update from db to state.
    case CostumersActionTypes.ITEMS_FETCH_DATA_SUCCESS: {
        
      console.log('SUCCESS FETCH', action.items);
        
      const costumerData = [];
        
      action.items.forEach(function(element) {
        const tempData = [
          element.firstName, 
          element.lastName, 
          element.contactNumber, 
          element.email,
          // element._id,
          '',
        ];
        costumerData.push(tempData);
      }, this); 
              
      console.log(costumerData)
        
      return {
        ...state,
        costumerData: costumerData,
      };
    }
        
    // Sucessfull new costumer posted to database
    case CostumersActionTypes.ITEMS_POST_DATA_SUCCESS: {
              
      console.log('SUCESS POST', action.result);
              
      return {
        ...state,
      };
    }
    // Default state: no changes
    default:
      return state;
  }
}
      
export default costumers;
