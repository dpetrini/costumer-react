
export let COSTUMERS_URL;
export let LOGIN_URL;
export let LOGOUT_URL;
export let PROPOSAL_URL;
export let PROPOSAL_EMAIL_URL;


if (process.env.NODE_ENV === 'production') { 
  COSTUMERS_URL = '/costumers';
  LOGIN_URL = '/users/loginclient';
  LOGOUT_URL = '/users/logoutclient';
  PROPOSAL_URL = '/proposals';
  PROPOSAL_EMAIL_URL = '/proposals/email';
} else {
  COSTUMERS_URL = 'http://127.0.0.1:3000/costumers/';
  LOGIN_URL = 'http://127.0.0.1:3000/users/loginclient/';
  LOGOUT_URL = 'http://127.0.0.1:3000/users/logoutclient';
  PROPOSAL_URL = 'http://127.0.0.1:3000/proposals';
  PROPOSAL_EMAIL_URL = 'http://127.0.0.1:3000/proposals/email';
}
