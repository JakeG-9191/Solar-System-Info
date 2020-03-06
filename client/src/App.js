import React, { Component } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import SpaceMap from './components/SpaceMap';
import Game from './components/Game';
import Mars from './components/Mars';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

class App extends Component {
  state = {
    cookieMessage:
      'We use cookies and web analytics trackers to help improve site performance and your experience, by continuing to use this website you consent to this policy.'
  };

  clearCookie = () => {
    this.setState({
      cookieMessage: ''
    });
  };

  render() {
    return (
      <>
        {this.state.cookieMessage ? (
          <div className='quasi-cookie'>
            <p>{this.state.cookieMessage}</p>
            <button onClick={this.clearCookie} className='btn btn-dark'>
              Close
            </button>
          </div>
        ) : (
          ''
        )}
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/solar_map' component={SpaceMap} />
            <Route exact path='/game' component={Game} />
            <Route exact path='/mars' component={Mars} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
