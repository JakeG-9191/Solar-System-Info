import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SpaceMap from './components/SpaceMap';
import Game from './components/Game';
import Mars from './components/Mars';
import './App.css';

class App extends Component {
  state = {
    cookieMessage: ''
  };

  componentWillMount() {
    this.isCookieConsented();
  }

  clearCookie = () => {
    this.setState({
      cookieMessage: ''
    });
    this.cookieInfo();
  };

  cookieInfo = () => {
    localStorage.setItem('confirmed', true);
  };

  isCookieConsented = () => {
    let checked = localStorage.getItem('confirmed');
    console.log(`this user's consent for cookie, status: ${checked}`);
    if (checked) {
      this.setState({
        cookieMessage: ''
      });
    } else {
      this.setState({
        cookieMessage:
          'We use cookies and web analytics trackers to help improve site performance and your experience, by continuing to use this website you consent to this policy.'
      });
    }
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
            <Route path='/login' component={Login} />
            <Route path='/solar_map' component={SpaceMap} />
            <Route path='/game' component={Game} />
            <Route path='/mars' component={Mars} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
