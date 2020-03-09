import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import API from '../../utils/API';
import Facts from '../../json/facts.json';
import NasaVid from '../../json/nasaVideos';
import './style.css';

let rollingHeight = window.screen.height / 2;
let rollingWidth = window.screen.width / 2;

class Home extends Component {
  state = {
    fixedHeight: rollingHeight,
    fixedWidth: rollingWidth,
    randomImage: '',
    randomVideo: '',
    randomDescription: '',
    date: '',
    factTitle: '',
    factBody: '',
    factSource: '',
    factURL: '',
    nasaVideoURL: '',
    nasaVideoDate: '',
    nasaVideoTitle: ''
  };

  componentDidMount() {
    this.loadBackground();
    this.loadNasaVideo();
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
    this.loadNewFact();
  }

  loadNasaVideo = () => {
    let newVideo = Math.floor(Math.random() * NasaVid.length);
    this.setState({
      nasaVideoURL: NasaVid[newVideo].url,
      nasaVideoDate: NasaVid[newVideo].date_created,
      nasaVideoTitle: NasaVid[newVideo].title
    });
  };

  loadNewFact = () => {
    let newFact = Math.floor(Math.random() * Facts.length);
    this.setState({
      factTitle: Facts[newFact].title,
      factBody: Facts[newFact].body,
      factSource: Facts[newFact].source,
      factURL: Facts[newFact].url
    });
  };

  loadBackground = () => {
    let newBackground = Math.floor(Math.random() * 4);
    document.body.classList.remove(`game${0}`);
    document.body.classList.remove(`mars${0}`);
    document.body.classList.remove(`space-map${0}`);
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
          <Link to='/solar_map'>
            <button className='btn btn-success'>Interactive Map</button>
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
        <div id='intro-banner'>
          <h1>Welcome To Our Solar System!</h1>
        </div>
        <div className='container'>
          <div className='row'>
            <div id='aboutWebsite' className='col-md-3'>
              <h2>About This Website</h2>
              <h5 id='websiteInfo'>
                Our Solar System! is a website about our very own Solar System,
                which is home to our own planet Earth, as well as 7 other
                planets, thier moons and numerous other objects, the most
                massive of which is our star at the center of it all, the Sun!
                This website has additional information on various parts of the
                Solar System, including a page dedicated entirely to Mars, the
                ability to leave messages and comments, and a series of games
                that will test your knowledge about planets, space and our Solar
                System. Thank you for stopping by!
              </h5>
              <h6>
                Special Thanks to NASA Open APIs for providing much of the
                imagery for various aspects of the website.
              </h6>
            </div>
            <div className='col-md-1'></div>
            <div className='facts col-md-4'>
              <h2>{this.state.factTitle}</h2>
              <h5 id='facts-body'>{this.state.factBody}</h5>
              <h6>Source: {this.state.factSource}</h6>
              <a
                target='_blank'
                rel='noopener noreferrer'
                href={this.state.factURL}
              >
                {this.state.factURL}
              </a>
            </div>
            <div className='col-md-1'></div>
            <div id='nasa-videos' className='col-md-3'>
              <a
                target='_blank'
                rel='noopener noreferrer'
                href={this.state.nasaVideoURL}
              >
                <h5>{this.state.nasaVideoTitle}</h5>
              </a>
              <ReactPlayer
                url={this.state.nasaVideoURL}
                playing
                muted
                controls={true}
                loop={true}
                width={'fit-content'}
                height={'fit-content'}
              />
              <h6>Source: NASA</h6>
            </div>
            <div className='welcome col-md-12'>
              <h2>NASA Photo / Video Of The Day!</h2>
              <h3>{this.state.date}</h3>
              <a
                target='_blank'
                rel='noopener noreferrer'
                href={this.state.randomImage}
              >
                <img
                  id='randomImage'
                  alt='An issue occured while trying to load this image'
                  src={this.state.randomImage ? this.state.randomImage : ''}
                  height={this.state.rollingHeight}
                ></img>
              </a>
              <h5 id='dailyInfo'>{this.state.randomDescription}</h5>
              <ReactPlayer
                url={this.state.randomVideo ? this.state.randomVideo : ''}
                playing
                muted
                controls={true}
                id='randomVideo'
                width={
                  this.state.randomVideo ? this.state.rollingHeight : '0px'
                }
                height={
                  this.state.randomVideo ? this.state.rollingWidth : '0px'
                }
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
