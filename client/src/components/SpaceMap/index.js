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
      shape: 'circle',
      coords: [350, 1020, 80],
      preFillColor: 'green',
      fillColor: 'blue'
    },
    {
      name: '2',
      shape: 'circle',
      coords: [528, 947, 80],
      preFillColor: 'pink'
    },
    {
      name: '3',
      shape: 'circle',
      coords: [707, 873, 80],
      preFillColor: 'orange'
    },
    {
      name: '4',
      shape: 'circle',
      coords: [885, 797, 80],
      preFillColor: 'orange',
      fillColor: 'blue'
    },
    {
      name: '5',
      shape: 'poly',
      coords: [1050, 449, 1015, 702, 1065, 1077, 1119, 779],
      preFillColor: 'green',
      fillColor: 'blue'
    },
    {
      name: '6',
      shape: 'circle',
      coords: [1240, 645, 80],
      fillColor: 'yellow',
      preFillColor: 'green',
      title: 'Mercury',
      otherInfo: 'testing this to see what kind of info can be placed'
    }
  ]
};

const testWidth = window.screen.width; // 2560
const testHeight = window.screen.height; // 1440

const calcWitdh = window.screen.width * 0.9;
const calcHeight = window.screen.height * 0.9;

// const calcWitdh = window.screen.width - window.screen.width * 0.2;

class SpaceMap extends Component {
  state = {
    hoveredArea: null,
    testHover: 'Hover Over Solar System Feature To See More',
    title: '',
    X: '',
    Y: ''
  };

  // infoUpdate = () => {
  //   MAP.areas[6].preFillColor = 'blue';
  //   MAP.areas[6].coords = [
  //     testWidth - testWidth * 0.5,
  //     testHeight - testHeight * 0.5,
  //     80
  //   ];
  // };

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
        <div>
          <ImageMapper
            src={URL}
            map={MAP}
            width={calcWitdh}
            height={calcHeight}
            onMouseEnter={area => this.enterArea(area)}
            onMouseLeave={area => this.leaveArea(area)}
          />
          <div className='navBar interactive-fix'>
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
          {this.state.hoveredArea && (
            <span
              className='tooltip'
              style={{ ...this.getTipPosition(this.state.hoveredArea) }}
            >
              {this.state.hoveredArea && this.state.hoveredArea.name}
            </span>
          )}
          <div className='testing-overlay'>
            <h1>Testing Interactive Map</h1>
            <h1>X: {this.state.X}</h1>
            <h1>Y: {this.state.Y}</h1>
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
            <h1>{this.state.title}</h1>
            <h2>{this.state.testHover}</h2>
          </div>
        </div>
      </>
    );
  }
}

export default SpaceMap;
