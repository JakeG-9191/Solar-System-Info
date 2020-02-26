import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/API';
import './style.css';

class Mars extends Component {
  state = {
    marsUpdatedWeather: [],
    marsUpdatedSols: []
  };

  // Loads background, this is a function because it needs to clear previous backgrounds
  // Loads inital weather grab, which sets state of sols or martian days to grab weather with
  componentDidMount() {
    this.loadBackground();
    this.getUpdatedWeather();
  }

  // Uses API pull to grab all sol/day data and corresponding weather data
  getUpdatedWeather = () => {
    API.getMarsWeather().then(data => {
      // console.log(data.data);
      // console.log(data.data.sol_keys);
      // console.log(parseInt(data.data.sol_keys[1]));
      // console.log(data.data[443].AT.av);

      let dates = data.data.sol_keys;
      let newDates = [];
      for (let i = 0; i < dates.length; i++) {
        newDates.push(parseInt(dates[i]));
      }

      // console.log(newDates);

      let totalDates = newDates.length;
      let allSolWeather = [];
      for (let j = 0; j < totalDates; j++) {
        allSolWeather.push(data.data[newDates[j]].AT.av);
      }
      console.log(allSolWeather);

      this.setState({
        marsUpdatedSols: newDates,
        marsUpdatedWeather: allSolWeather
      });
    });
  };

  loadBackground = () => {
    let newBackground = Math.floor(Math.random() * 1);
    document.body.classList.remove(`backdrop${0}`);
    document.body.classList.remove(`backdrop${1}`);
    document.body.classList.remove(`backdrop${2}`);
    document.body.classList.remove(`backdrop${3}`);
    document.body.classList.remove(`game${0}`);
    document.body.classList.remove(`post${0}`);
    document.body.classList.add(`mars${newBackground}`);
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
            <button className='btn btn-info'>Mars Special</button>
          </Link>
          <Link to='/game'>
            <button className='btn btn-success'>
              Solar System Trivia Game
            </button>
          </Link>
        </div>
        <div>
          <h1>The Mars Special</h1>
          <iframe
            src='https://mars.nasa.gov/layout/embed/image/insightweather/'
            width='800'
            height='530'
            scrolling='no'
            frameBorder='0'
          ></iframe>
          <div>
            <div>
              {this.state.marsUpdatedSols.map(sols => `Sol ${sols} | `)}
            </div>
            <div>
              {this.state.marsUpdatedWeather.map(
                weather => `Air Temp: ${weather} | `
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Mars;
