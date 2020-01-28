import React from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Posts from './components/Posts';
import Game from './components/Game';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/posts' component={Posts} />
        <Route exact path='/game' component={Game} />
      </Switch>
    </Router>
  );
}

export default App;
