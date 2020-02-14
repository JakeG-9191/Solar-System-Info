import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EarthQuestions from '../../json/earthGame';
import SolarQuestions from '../../json/solarGame';
import ClassifiedQuestions from '../../json/classifiedGame';
import './style.css';

class Game extends Component {
  state = {
    gameEdition: '',
    gameStart: false,
    gameChoice: false,
    initialGameState: true,
    playerScore: 0,
    gameReset: false,
    startEarth: false,
    startSolar: false,
    startClassified: false,
    questionNum: 0,
    question: '',
    right: '',
    a1: '',
    a2: '',
    a3: '',
    a4: ''
  };

  loadNewQuestion = () => {
    if (this.state.gameEdition === 'Earth') {
      this.setState({
        question: EarthQuestions[this.state.questionNum].question,
        a1: EarthQuestions[this.state.questionNum].a1,
        a2: EarthQuestions[this.state.questionNum].a2,
        a3: EarthQuestions[this.state.questionNum].a3,
        a4: EarthQuestions[this.state.questionNum].a4,
        right: EarthQuestions[this.state.questionNum].right
      });
    }
    if (this.state.gameEdition === 'Solar System') {
      this.setState({
        question: SolarQuestions[this.state.questionNum].question,
        a1: SolarQuestions[this.state.questionNum].a1,
        a2: SolarQuestions[this.state.questionNum].a2,
        a3: SolarQuestions[this.state.questionNum].a3,
        a4: SolarQuestions[this.state.questionNum].a4,
        right: SolarQuestions[this.state.questionNum].right
      });
    }
    if (this.state.gameEdition === 'Classified') {
      this.setState({
        question: ClassifiedQuestions[this.state.questionNum].question,
        a1: ClassifiedQuestions[this.state.questionNum].a1,
        a2: ClassifiedQuestions[this.state.questionNum].a2,
        a3: ClassifiedQuestions[this.state.questionNum].a3,
        a4: ClassifiedQuestions[this.state.questionNum].a4,
        right: ClassifiedQuestions[this.state.questionNum].right
      });
    }
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
      this.solarGameStart();
    } else if (this.state.gameEdition === 'Classified') {
      this.classifiedGameStart();
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
      playerScore: 0,
      gameReset: false,
      startEarth: false,
      startSolar: false,
      startClassified: false,
      initialGameState: true,
      questionNum: 0
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

  solarGameStart = () => {
    this.setState({
      startSolar: true,
      questionNum: this.state.questionNum + 1
    });
    this.loadNewQuestion();
  };

  classifiedGameStart = () => {
    this.setState({
      startClassified: true,
      questionNum: this.state.questionNum + 1
    });
    this.loadNewQuestion();
  };

  // Game Logic - should be reusable for any game mode

  // Need to display all applicable questions based on game mode
  // Need to be able to allow player to select 1 of 4 answers
  // Should allow for players to change thier answers before they submit if they wish - NOT CURRENLTY SUPPORTED
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
    // this value needs to be manually updated currently, can likely automate based on return values of json call in future
    if (this.state.questionNum < 4) {
      this.loadNewQuestion();
    } else {
      this.gameOver();
    }
  };

  gameOver = () => {
    console.log('Game over');
    this.setState({
      questionNum: 0,
      a1: '',
      a2: '',
      a3: '',
      a4: '',
      gameReset: true
    });
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
          <h1>Welcome To The Trivia Games!</h1>
          <h3 className='game-directions'>
            To play, select the button below to display all game choices, then
            make a selection and start a new game. Quesitons will be posted with
            4 answers to choose from, make your selection carefully as there is
            no way to return to the last question. After the last questions in
            the quiz is answered, your results will be displayed and you will be
            allowed to play again. These questions are currently not timed.
          </h3>
          {this.state.initialGameState ? (
            ''
          ) : (
            <button
              className='btn btn-primary game-utility'
              onClick={this.selectionReset}
            >
              Return To All Game Modes
            </button>
          )}
          <div>
            {this.state.initialGameState ? (
              <button
                className='btn btn-primary game-utility'
                onClick={this.showGame}
              >
                View All Game Choices
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
        <div>
          <div>
            {this.state.gameChoice ? (
              <button
                className='btn btn-primary game-utility'
                onClick={this.earthEdition}
              >
                Earth Edition
              </button>
            ) : (
              ''
            )}
          </div>
          <div>
            {this.state.gameChoice ? (
              <button
                className='btn btn-primary game-utility'
                onClick={this.solarEdition}
              >
                Solar Edition
              </button>
            ) : (
              ''
            )}
          </div>
          <div>
            {this.state.gameChoice ? (
              <button
                className='btn btn-primary game-utility'
                onClick={this.classifiedEdition}
              >
                Classified Edition
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
        <div>
          {this.state.gameStart ? (
            <button
              className='btn btn-primary game-utility'
              onClick={this.startGame}
            >
              Start New Game
            </button>
          ) : (
            ''
          )}
        </div>
        <div className='earth-game-questions'>
          {this.state.startEarth ? (
            <>
              <div>
                {!this.state.gameReset ? (
                  <>
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
                  </>
                ) : (
                  ''
                )}
              </div>
              <div>
                {this.state.gameReset ? (
                  <button onClick={this.selectionReset}>Game Reset</button>
                ) : (
                  ''
                )}
                {this.state.gameReset ? (
                  <h1>Final Player Score = {this.state.playerScore}</h1>
                ) : (
                  ''
                )}
              </div>
            </>
          ) : (
            ''
          )}
        </div>
        <div className='solar-game-questions'>
          {this.state.startSolar ? (
            <>
              <div>
                {!this.state.gameReset ? (
                  <>
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
                  </>
                ) : (
                  ''
                )}
              </div>
              <div>
                {this.state.gameReset ? (
                  <button onClick={this.selectionReset}>Game Reset</button>
                ) : (
                  ''
                )}
                {this.state.gameReset ? (
                  <h1>Final Player Score = {this.state.playerScore}</h1>
                ) : (
                  ''
                )}
              </div>
            </>
          ) : (
            ''
          )}
        </div>
        <div className='classified-game-questions'>
          {this.state.startClassified ? (
            <>
              <div>
                {!this.state.gameReset ? (
                  <>
                    <h3 className='game-question-number'>
                      Q. {this.state.questionNum}
                    </h3>
                    <h2 className='game-question'>{this.state.question}</h2>
                    <button
                      className='btn btn-primary game-buttons'
                      onClick={this.checkAnswer}
                      data_id='1'
                    >
                      {this.state.a1}
                    </button>
                    <button
                      className='btn btn-primary game-buttons'
                      onClick={this.checkAnswer}
                      data_id='2'
                    >
                      {this.state.a2}
                    </button>
                    <button
                      className='btn btn-primary game-buttons'
                      onClick={this.checkAnswer}
                      data_id='3'
                    >
                      {this.state.a3}
                    </button>
                    <button
                      className='btn btn-primary game-buttons'
                      onClick={this.checkAnswer}
                      data_id='4'
                    >
                      {this.state.a4}
                    </button>
                  </>
                ) : (
                  ''
                )}
              </div>
              <div>
                {/* {this.state.gameReset ? (
                  <button
                    className='btn btn-primary game-utility'
                    onClick={this.selectionReset}
                  >
                    Game Reset
                  </button>
                ) : (
                  ''
                )} */}
                {this.state.gameReset ? (
                  <h1 className='game-player-score'>
                    Final Score - {this.state.playerScore}
                  </h1>
                ) : (
                  ''
                )}
              </div>
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
