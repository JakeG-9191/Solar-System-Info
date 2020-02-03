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
            <button className='btn btn-success'>Home</button>
          </Link>
          <Link to='/login'>
            <button className='btn btn-success'>Login</button>
          </Link>
          <Link to='/posts'>
            <button className='btn btn-success'>Forum Posts</button>
          </Link>
          <Link to='/game'>
            <button className='btn btn-success'>
              Solar System Trivia Game
            </button>
          </Link>
        </div>
        <div className='container'>
          <h1>Welcome To My Solar System!</h1>
          <div className='row'>
            <div className='welcome'>
              <h2>NASA Photo Of The Day!</h2>
              <h3>{this.state.date}</h3>
              <img
                id='randomImage'
                src={this.state.randomImage ? this.state.randomImage : ''}
              ></img>
              <ReactPlayer
                url={this.state.randomVideo ? this.state.randomVideo : ''}
                playing
              />
              <h5>{this.state.randomDescription}</h5>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
