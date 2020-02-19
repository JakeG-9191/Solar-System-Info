import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/API';
import './style.css';

class Mars extends Component {
  state = {
    marsDates: [],
    marsFixedDates: [],
    marsUpdatedWeather: []
  };

  componentDidMount() {
    this.loadBackground();
    this.getUpdatedWeather();
  }

  getUpdatedWeather = () => {
    API.getMarsWeather().then(data => {
      console.log(data.data);
      console.log(data.data.sol_keys);
      console.log(data.data[430].AT.av);
      this.setState({
        marsDates: data.data.sol_keys
      });
      this.fixDates();
    });
  };

  fixDates = () => {
    let allDates = [];
    let dates = this.state.marsDates.map(date => {
      let fixedDates = parseInt(date);
      return allDates.push(fixedDates);
    });
    this.setState({
      marsFixedDates: allDates
    });
    this.airTempAverage();
  };

  airTempAverage = () => {
    let tempGauge = this.state.marsFixedDates;
    let allTemps = tempGauge.length;
    let updatedArray = [];
    for (let i = 0; i < allTemps; i++) {
      let sol = tempGauge[i];
      let testArray = [];
      API.getMarsWeather().then(data => {
        console.log(data.data[sol].AT.av);
        testArray.push(...testArray, data.data[sol].AT.av);
      });
      console.log(testArray);
      return updatedArray.push(testArray);
    }
    this.setState({
      marsUpdatedWeather: updatedArray
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
            frameborder='0'
          ></iframe>
          <h3>
            {this.state.marsFixedDates.map(date => {
              return `Sol ${date}\n| `;
            })}
          </h3>
          <h4>
            {this.state.marsUpdatedWeather.map(test => {
              return `test ${test}`;
            })}
          </h4>
          <button onClick={this.fixDates}>test dates</button>
        </div>
      </>
    );
  }
}

export default Mars;
