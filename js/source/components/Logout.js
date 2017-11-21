
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as AuthActionCreators from '../actions/auth';
import * as config from '../config';

class Logout extends Component {

  // If user logged in jump out
  componentWillMount() {

    
    const { dispatch } = this.props;
    
    //  loginPostData: (url) => dispatch(AuthActionCreators.loginPostData(url));


    const logoutPostData = bindActionCreators((url) =>AuthActionCreators.logoutPostData(url), dispatch);

    
    if (this.props.authorized) {
      logoutPostData(config.LOGOUT_URL)
      this.props.history.push('/');
    }
  }
      

  componentDidUpdate() {
    if (this.props.authorized)
      this.props.history.push('/');
  }

  render () {
    return (
      <div className={'main-screen-body'} >
        <h2>Logging Out</h2>
      </div>
    );
  }
}

// export default NavBarTop

const mapStateToProps = state => (
  { 
    authorized: state.authorized,
  }
);

// Thunk
// const mapDispatchToProps = (dispatch) => {
//   return {
//     logoutPostData: (url) => dispatch(AuthActionCreators.loginPostData(url)),
//   };
// };

// Subscribes any changes in state to the container Scoreboard 
// export default connect(mapStateToProps/*, mapDispatchToProps*/)(Login)
export default withRouter(connect(mapStateToProps)(Logout));
