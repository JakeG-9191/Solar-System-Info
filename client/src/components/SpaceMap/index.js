import React, { Component } from 'react';
import API from '../../utils/API';
import { Link } from 'react-router-dom';
import './style.css';

class SpaceMap extends Component {
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
    document.body.classList.remove(`game${0}`);
    document.body.classList.add(`space-map${newBackground}`);
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
          <Link to='/solar_map'>
            <button className='btn btn-info'>Interactive Map</button>
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
          <h1>Testing Interactive Map</h1>
          <ul>
            <li>Several Interactive Elements, should be clicked on</li>
            <li>
              Have information upon hover, and then different information upon
              click
            </li>
            <li>Once Clicked on, information should be displayed</li>
            <li>This information is probably static, could be dynamic</li>
            <li>
              Could use png pictures to make clicking on element more
              interactive
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default SpaceMap;
