import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import API from '../../utils/API';
import { Link } from 'react-router-dom';
import './style.css';

class Home extends Component {
  state = {
    randomImage: '',
    randomVideo: '',
    randomDescription: '',
    date: ''
  };

  componentDidMount() {
    this.loadBackground();
    API.getDailyImage().then(data => {
      console.log(data);
      if (data.data.media_type === 'video') {
        this.setState({
          randomVideo: data.data.url,
          date: data.data.date,
          randomDescription: data.data.explanation
        });
      } else {
        this.setState({
          randomImage: data.data.url,
          date: data.data.date,
          randomDescription: data.data.explanation
        });
      }
    });
  }

  loadBackground = () => {
    let newBackground = Math.floor(Math.random() * 4);
    document.body.classList.add(`backdrop${newBackground}`);
  };

  render() {
    return (
      <>
        <div className='navBar'>
          <Link to='/'>
            <button className='btn btn-info'>Home</button>
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
            <button className='btn btn-success'>
              Solar System Trivia Game
            </button>
          </Link>
        </div>
        <div>
          <h1>Welcome To My Solar System!</h1>
        </div>
        <div className='container'>
          <div className='row'>
            <div id='aboutWebsite'>
              <h2>About This Website</h2>
              <h4 id='websiteInfo'>
                My Solar System! is a website about our very own Solar System,
                which is home to our own planet Earth, as well as 7 other
                planets, thier moons and numerous other objects, the most
                massive of which is star at the center of it all, the Sun! This
                website has additional information on various parts of the Solar
                System, including a page dedicated entirely to Mars, the ability
                to leave messages and comments, and a series of games that will
                test your knowledge about planets, space and our Solar System.
                Thank you for stopping by!
              </h4>
              <h6>
                Special Thanks to NASA Open APIs for providing much of the
                imagery for various aspects of the website.
              </h6>
            </div>
            <div className='welcome'>
              <h2>NASA Photo / Video Of The Day!</h2>
              <h3>{this.state.date}</h3>
              <img
                id='randomImage'
                src={this.state.randomImage ? this.state.randomImage : ''}
              ></img>
              <ReactPlayer
                url={this.state.randomVideo ? this.state.randomVideo : ''}
                playing
                id='randomVideo'
              />
              <h5 id='dailyInfo'>{this.state.randomDescription}</h5>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
