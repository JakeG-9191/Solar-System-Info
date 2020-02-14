import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EarthQuestions from '../../json/earthGame';
import './style.css';

class Game extends Component {
  state = {
    gameEdition: '',
    gameStart: false,
    gameChoice: false,
    initialGameState: true,
    playerScore: 0,
    startEarth: false,
    questionNum: 0,
    question: '',
    right: '',
    a1: '',
    a2: '',
    a3: '',
    a4: ''
  };

  loadNewQuestion = () => {
    this.setState({
      question: EarthQuestions[this.state.questionNum].question,
      a1: EarthQuestions[this.state.questionNum].a1,
      a2: EarthQuestions[this.state.questionNum].a2,
      a3: EarthQuestions[this.state.questionNum].a3,
      a4: EarthQuestions[this.state.questionNum].a4,
      right: EarthQuestions[this.state.questionNum].right
    });
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

  // depending on what selection is made, kicks off game
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

  // Reset game selection so all game modes are available to choose from
  // Reset player score
  selectionReset = () => {
    this.setState({
      initialGameState: true,
      playerScore: 0
    });
  };

  // select Earth Game edition
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

  // set Earth Game edition to Start
  earthGameStart = () => {
    this.setState({
      startEarth: true,
      questionNum: this.state.questionNum + 1
    });
    this.loadNewQuestion();
  };

  // Game Logic - should be reusable for any game mode

  // Need to display all applicable questions based on game mode
  // Need to be able to allow player to select 1 of 4 answers
  // Should allow for players to change thier answers before they submit if they wish
  checkAnswer = e => {
    this.setState({
      questionNum: this.state.questionNum + 1
    });
    this.otherCheck(e);
  };

  otherCheck = e => {
    let id = e.target.getAttribute('data_id');
    if (id === this.state.right) {
      this.setState({
        playerScore: this.state.playerScore + 1
      });
    }
    //moves num from 0 to 1
    console.log('quesitonNum', this.state.questionNum);
    // if num is less than total quesiton, do new question
    if (this.state.questionNum < 4) {
      this.loadNewQuestion();
    }
  };

  // Submission of answers should check if selected choices are correct
  // if correct, add one to player score
  // if incorrect, do nothing
  // Display Score for Player
  // Ask if Player wants to play again

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
                <h3>Num: {this.state.questionNum}</h3>
                <h2>{this.state.question}</h2>
                <button onClick={this.checkAnswer} data_id='1'>
                  {this.state.a1}
                </button>
                <button onClick={this.checkAnswer} data_id='2'>
                  {this.state.a2}
                </button>
                <button onClick={this.checkAnswer} data_id='3'>
                  {this.state.a3}
                </button>
                <button onClick={this.checkAnswer} data_id='4'>
                  {this.state.a4}
                </button>
              </div>
              <button>Submit Answer</button>
            </>
          ) : (
            ''
          )}
        </div>
      </>
    );
  }
}

export default Game;
