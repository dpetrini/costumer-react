
export let COSTUMERS_URL;
export let LOGIN_URL;


if (process.env.NODE_ENV === 'production') { 
  COSTUMERS_URL = '/costumers';
  LOGIN_URL = '/users/login';
} else {
  COSTUMERS_URL = 'http://127.0.0.1:3000/costumers/';
  LOGIN_URL = 'http://127.0.0.1:3000/users/login/';
}


// export default class config {
//   COSTUMERS_URL = 'http://127.0.0.1:3000/costumers/';
// }

// export const COSTUMERS_URL = 'http://127.0.0.1:3000/costumers/';
