import * as ProposalActionTypes from '../actiontypes/proposals';

// Default values for quotes table (stored in db)
const initialState = {
  quotes: [
    { firstName: 'João', lastName: 'Pereira', sysProposal: '8.3', date: '23/09/2017', totalCost: 'R$ 986,00', status: 'Sent'},
    { firstName: 'Silvia', lastName: 'Joao', sysProposal: '5.3', date: '01/09/2017', totalCost: 'R$ 12.375,00', status: 'Follow-up-1'},
  ], 
  proposalSent: false,
};

export const proposals = (state = initialState, action) => {
    
  switch (action.type) {

    // ***********  User clicks on Send Proposal button.
    // Get proposal data from db
    case ProposalActionTypes.PROPOSAL_GET_DATA_SUCESS: {
        
      console.log('SUCCESS Get Proposal', action.result);
        
      // Shape from quotes coming from DB:
      //
      //   const proposalData	= {
      //     _id: element._id, 
      //     firstName: element.Name,
      //     lastName:  element.LastName,
      //     avgConsumption: element.avgConsumption,
      //     sysProposal: element.sysProposal,
      //     panels: element.panels,
      //     totalCost: element.totalCost,
      //     payback: element.payback,
      //     gerCost: element.gerCost,
      //     avgCost: element.avgCost,
      //     status: element.status,
      //     date: element.date,
      //   };
              
      return {
        ...state,
        quotes: action.result,
        proposalSent: false, // as we came directly to here let´s reset 
      };
    }
              
    case ProposalActionTypes.PROPOSAL_SEND_SUCCESS: {
                  
      console.log('Proposal send with success.', action.result);
                  
      return {
        ...state,
        proposalSent: true,
      };
    }    
            
    // Logout successfull
    case ProposalActionTypes.PROPOSAL_SEND_FAIL: {
                  
      console.log('Error in sending proposal to server.', action.result);
                  
      return {
        ...state,
        proposalSent: false,
      };
    }

    // Default state: no changes
    default:
      return state;
  }
}
        
export default proposals;
