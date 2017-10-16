import React, {Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// https://react.rocks/example/S3-Infrequent-Access-Calculator
// https://github.com/gshakir/S3-Infrequent-Access-Calculator/blob/master/src/App.js
// https://wrapbootstrap.com/tag/react

import Footer from './components/Footer';
import Body from './containers/Body'
import NavBarTop from './components/NavBarTop';

import About from './components/About';
import Help from './components/Help';
import MyQuotes from './components/MyQuotes';
import UserConfig from './components/UserConfig';

import Login from './components/Login';

import '../../css/App.css'; 

// This App Components implements React Router v4 for all app

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div> 
          <NavBarTop />
          <Switch>
            <Route exact path="/" component={Body} />
            <Route path="/about" component={About} />
             <Route path="/help" component={Help} /> 
            <Route path="/myquotes" component={MyQuotes} />
            <Route path="/userconfig" component={UserConfig} />
            <PrivateRoute authed={this.props.authed} path="/login" component={Login} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

// export default App;

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/about', state: {from: props.location}}} />}
    />
  )
}

// transform state to props (state change are injected in props in below statements)
const mapStateToProps = state => (
  { 
    authed: state.authorized,
  }
);

// Thunk
// const mapDispatchToProps = (dispatch) => {
//   return {
//     loginPostData: (url) => dispatch(SystemActionCreators.loginPostData(url)),
//   };
// };

// Subscribes any changes in state to the container Scoreboard 
// export default withRouter(connect(mapStateToProps)(Body))
export default connect(mapStateToProps/*, mapDispatchToProps*/)(App)
