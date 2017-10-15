import React, {Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

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
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
