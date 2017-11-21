import { combineReducers } from 'redux'

import system from './system'
import authorized from './auth';
import proposals from './proposals';
import costumers from './costumers';

// All reducers
export const reducers = combineReducers({
  system: system,         // Handles business logic
  authorized: authorized, // Handles login/user etc
  proposals: proposals,   // Handels proposals in tables, db
  costumers: costumers,   // handle costumers tables,db
})

export default reducers
