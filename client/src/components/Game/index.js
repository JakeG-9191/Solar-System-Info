import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class Game extends Component {
  state = {
    gameEdition: '',
    gameStart: false,
    gameChoice: false,
    initialGameState: true,
    playerScore: 0,
    rightCount: 0,
    startEarth: false
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

  showGame = e => {
    e.preventDefault();
    this.setState({
      gameChoice: true
    });
  };

  startGame = () => {
    if (this.state.gameEdition === 'Earth') {
      this.earthGameStart();
    } else if (this.state.gameEdition === 'Solar System') {
      console.log('Solar');
    } else if (this.state.gameEdition === 'Classified') {
      console.log('Classified');
    }
    this.setState({
      gameStart: false,
      gameChoice: false,
      initialGameState: false
    });
  };

  selectionReset = () => {
    this.setState({
      initialGameState: true
    });
  };

  earthEdition = e => {
    e.preventDefault();
    this.setState({
      gameEdition: 'Earth',
      gameStart: true
    });
  };

  solarEdition = e => {
    e.preventDefault();
    this.setState({
      gameEdition: 'Solar System',
      gameStart: true
    });
  };

  classifiedEdition = e => {
    e.preventDefault();
    this.setState({
      gameEdition: 'Classified',
      gameStart: true
    });
  };

  addPoints = () => {
    this.setState({
      playerScore: this.state.playerScore + this.state.rightCount
    });
  };

  earthGameStart = () => {
    this.setState({
      startEarth: true
    });
  };

  rightAnswerSelected = () => {
    this.setState({
      rightCount: this.state.rightCount + 1
    });
  };

  wrongAnswerSelected = () => {};

  submitAnswer = () => {
    this.addPoints();
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
          <h3>Score: {this.state.playerScore}</h3>
          {this.state.initialGameState ? (
            ''
          ) : (
            <button onClick={this.selectionReset}>
              Return To All Game Modes
            </button>
          )}
          <div>
            {this.state.initialGameState ? (
              <button onClick={this.showGame}>View All Game Choices</button>
            ) : (
              ''
            )}
          </div>
        </div>
        <div>
          <div>
            {this.state.gameChoice ? (
              <button onClick={this.earthEdition}>Earth Edition</button>
            ) : (
              ''
            )}
          </div>
          <div>
            {this.state.gameChoice ? (
              <button onClick={this.solarEdition}>Solar Edition</button>
            ) : (
              ''
            )}
          </div>
          <div>
            {this.state.gameChoice ? (
              <button onClick={this.classifiedEdition}>
                Classified Edition
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
        <div>
          {this.state.gameStart ? (
            <button onClick={this.startGame}>Start New Game</button>
          ) : (
            ''
          )}
        </div>
        <div className='earth-game-questions'>
          {this.state.startEarth ? (
            <>
              <div>
                <h2>What is the Choice?</h2>
                <button onClick={this.wrongAnswerSelected}>One</button>
                <button onClick={this.rightAnswerSelected}>Two</button>
                <button onClick={this.wrongAnswerSelected}>Three</button>
                <button onClick={this.wrongAnswerSelected}>Four</button>
              </div>
              <div>
                <h2>What is the Choice?</h2>
                <button onClick={this.wrongAnswerSelected}>One</button>
                <button onClick={this.rightAnswerSelected}>Two</button>
                <button onClick={this.wrongAnswerSelected}>Three</button>
                <button onClick={this.wrongAnswerSelected}>Four</button>
              </div>
              <div>
                <h2>What is the Choice?</h2>
                <button onClick={this.wrongAnswerSelected}>One</button>
                <button onClick={this.rightAnswerSelected}>Two</button>
                <button onClick={this.wrongAnswerSelected}>Three</button>
                <button onClick={this.wrongAnswerSelected}>Four</button>
              </div>
              <div>
                <h2>What is the Choice?</h2>
                <button onClick={this.wrongAnswerSelected}>One</button>
                <button onClick={this.rightAnswerSelected}>Two</button>
                <button onClick={this.wrongAnswerSelected}>Three</button>
                <button onClick={this.wrongAnswerSelected}>Four</button>
              </div>
              <div>
                <h2>What is the Choice?</h2>
                <button onClick={this.wrongAnswerSelected}>One</button>
                <button onClick={this.rightAnswerSelected}>Two</button>
                <button onClick={this.wrongAnswerSelected}>Three</button>
                <button onClick={this.wrongAnswerSelected}>Four</button>
              </div>
            </>
          ) : (
            ''
          )}
        </div>
        <button onClick={this.submitAnswer}>Submit Answer</button>
      </>
    );
  }
}

export default Game;
