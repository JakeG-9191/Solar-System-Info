import React, { Component } from 'react';
import API from '../../utils/API';
import ImageTest from '../../utils/spaceMap/0.jpg';
import ImageMapper from 'react-image-mapper';
import { Link } from 'react-router-dom';
import './style.css';

const URL = ImageTest;
const MAP = {
  name: 'my-map',
  areas: [
    {
      name: '1',
      shape: 'poly',
      coords: [25, 33, 27, 300, 128, 240, 128, 94],
      preFillColor: 'green',
      fillColor: 'blue'
    },
    {
      name: '2',
      shape: 'poly',
      coords: [219, 118, 220, 210, 283, 210, 284, 119],
      preFillColor: 'pink'
    },
    {
      name: '3',
      shape: 'poly',
      coords: [381, 241, 383, 94, 462, 53, 457, 282],
      fillColor: 'yellow'
    },
    {
      name: '4',
      shape: 'poly',
      coords: [245, 285, 290, 285, 274, 239, 249, 238],
      preFillColor: 'red'
    },
    { name: '5', shape: 'circle', coords: [335, 975, 50] },
    { name: '6', shape: 'circle', coords: [380, 875, 50] }
  ]
};

class SpaceMap extends Component {
  state = {
    hoveredArea: null
  };

  componentDidMount() {
    this.loadBackground();
  }

  enterArea(area) {
    this.setState({ hoveredArea: area });
  }

  leaveArea(area) {
    this.setState({ hoveredArea: null });
  }

  getTipPosition(area) {
    return { top: `${area.center[1]}px`, left: `${area.center[0]}px` };
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
        <div className='container'>
          <ImageMapper
            src={URL}
            map={MAP}
            width={2200}
            onMouseEnter={area => this.enterArea(area)}
            onMouseLeave={area => this.leaveArea(area)}
          />
          {this.state.hoveredArea && (
            <span
              className='tooltip'
              style={{ ...this.getTipPosition(this.state.hoveredArea) }}
            >
              {this.state.hoveredArea && this.state.hoveredArea.name}
            </span>
          )}
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
