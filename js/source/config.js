
export let COSTUMERS_URL;


if (process.env.NODE_ENV === 'production') { 
  COSTUMERS_URL = '/costumers';
} else {
  COSTUMERS_URL = 'http://127.0.0.1:3000/costumers/';
}


// export default class config {
//   COSTUMERS_URL = 'http://127.0.0.1:3000/costumers/';
// }

// export const COSTUMERS_URL = 'http://127.0.0.1:3000/costumers/';
