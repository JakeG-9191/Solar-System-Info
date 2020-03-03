import React, { Component } from 'react';
import API from '../../utils/API';
import SolarSystem from '../../utils/spaceMap/0.jpg';
import ImageMapper from 'react-image-mapper';
import { Link } from 'react-router-dom';
import './style.css';
import { findDOMNode } from 'react-dom';

const URL = SolarSystem;
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
      shape: 'circle',
      coords: [2560 * 0.8 - 1000 * 0.955, 1440 * 0.94 - 808 * 0.96, 70],
      preFillColor: 'pink'
    },
    {
      name: '3',
      shape: 'circle',
      coords: [2560 * 0.8 - 1328 * 0.955, 1440 * 0.94 - 670 * 0.96, 70],
      fillColor: 'orange'
    },
    {
      name: '4',
      shape: 'circle',
      coords: [2560 * 0.8 - 1490 * 0.955, 1440 * 0.94 - 602 * 0.96, 70],
      fillColor: 'blue'
    },
    {
      name: '5',
      shape: 'circle',
      coords: [2560 * 0.8 - 1800 * 0.955, 1440 * 0.94 - 471 * 0.96, 70],
      fillColor: 'yellow',
      title: 'Mercury',
      otherInfo: 'testing this to see what kind of info can be placed'
    },
    {
      name: '6',
      shape: 'circle',
      fillColor: 'red',
      coords: [2560 * 0.8 - 1648 * 0.955, 1440 * 0.94 - 536 * 0.96, 70]
    }
  ]
};

const testWidth = window.screen.width;
const testHeight = window.screen.height;

const calcWitdh = window.screen.width - window.screen.width * 0.2;

class SpaceMap extends Component {
  state = {
    hoveredArea: null,
    testHover: 'Hover Over Solar System Feature To See More',
    title: '',
    xStart: '',
    yStart: '',
    X: '',
    Y: ''
  };

  componentDidMount() {
    this.loadBackground();
  }

  componentWillMount() {
    window.addEventListener('click', this.getClickPosition, false);
  }

  getClickPosition = e => {
    this.setState({
      X: e.clientX,
      Y: e.clientY
    });
  };

  enterArea(area) {
    this.setState({
      hoveredArea: area,
      testHover: area.otherInfo,
      title: area.title
    });
  }

  leaveArea(area) {
    this.setState({
      hoveredArea: null,
      testHover: 'Hover Over Solar System Feature To See More',
      title: ''
    });
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
        <div className='container solar-fix'>
          <div className='row'>
            <div className='col-md-2'>
              <h1>Testing Interactive Map</h1>
              <h1>X: {this.state.X}</h1>
              <h1>Y: {this.state.Y}</h1>
              <ul>
                <li>Several Interactive Elements, should be clicked on</li>
                <li>
                  Have information upon hover, and then different information
                  upon click
                </li>
                <li>Once Clicked on, information should be displayed</li>
                <li>This information is probably static, could be dynamic</li>
                <li>
                  Could use png pictures to make clicking on element more
                  interactive
                </li>
              </ul>
              <h1>{this.state.title}</h1>
              <h2>{this.state.testHover}</h2>
            </div>
            <div id='solar-map' className='col-md-10 solar'>
              <ImageMapper
                id='solar-map'
                src={URL}
                map={MAP}
                width={calcWitdh}
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
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SpaceMap;
