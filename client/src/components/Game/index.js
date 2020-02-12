import React, { Component } from 'react';
import API from '../../utils/API';
import { Link } from 'react-router-dom';
import './style.css';

class Game extends Component {
  state = {
    gameEdition: '',
    gameStarted: false,
    gameChoice: false
  };

  componentDidMount() {
    this.loadBackground();
  }

  loadBackground = () => {
    let newBackground = Math.floor(Math.random() * 1);
    document.body.classList.remove(`backdrop${0}`);
    document.body.classList.remove(`backdrop${1}`);
    document.body.classList.remove(`backdrop${2}`);
    document.body.classList.remove(`backdrop${3}`);
    document.body.classList.remove(`mars${0}`);
    document.body.classList.remove(`post${0}`);
    document.body.classList.add(`game${newBackground}`);
  };

  startGame = () => {
    if (this.state.gameEdition === 'Earth') {
      console.log('Testing');
    } else if (this.state.gameEdition === 'Solar System') {
      console.log('Test For Solar System');
    } else if (this.state.gameEdition === 'Classified') {
      console.log('Classified Edition');
    }
  };

  earthEdition = e => {
    e.preventDefault();
    this.setState({
      gameEdition: 'Earth',
      gameStarted: true
    });
  };

  solarEdition = e => {
    e.preventDefault();
    this.setState({
      gameEdition: 'Solar System',
      gameStarted: true
    });
  };

  classifiedEdition = e => {
    e.preventDefault();
    this.setState({
      gameEdition: 'Classified',
      gameStarted: true
    });
  };

  render() {
    return (
      <>
        <div className='navBar'>
          <Link to='/'>
            <button className='btn btn-success'>Home</button>
          </Link>
          <Link to='/login'>
            <button className='btn btn-success' disabled>
              Login
            </button>
          </Link>
          <Link to='/posts'>
            <button className='btn btn-success'>Forum Posts</button>
          </Link>
          <Link to='/mars'>
            <button className='btn btn-success'>Mars Special</button>
          </Link>
          <Link to='/game'>
            <button className='btn btn-info'>Solar System Trivia Game</button>
          </Link>
        </div>
        <div>
          <h1>Testing Game</h1>
          <h3>Game Directions to go here</h3>
          <button onClick={this.startGame}>View All Game Choices</button>
        </div>
        <div>
          <button onClick={this.earthEdition}>Earth Edition</button>
          <button onClick={this.solarEdition}>
            General Solar System Edition
          </button>
          <button onClick={this.classifiedEdition}>Classified Edition</button>
        </div>
        <div>
          <button onClick={this.startGame}>Confirm Game Choice</button>
        </div>
      </>
    );
  }
}

export default Game;
