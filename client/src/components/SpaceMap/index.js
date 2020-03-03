import React, { Component } from 'react';
import InteractiveMap from '../../json/interactiveMap';
import SolarSystem from '../../utils/spaceMap/0.jpg';
import ImageMapper from 'react-image-mapper';
import { Link } from 'react-router-dom';
import './style.css';

const URL = SolarSystem;
const MAP = InteractiveMap;
// const MAP = {
//   name: 'my-map',
//   areas: [
//     {
//       name: '0',
//       shape: 'poly',
//       coords: [21, 186, 18, 1102, 91, 913, 125, 623, 92, 376],
//       title: 'Sun',
//       otherInfo: 'testing this to see what kind of info can be placed',
//       onClick: 'Additional information About Sun'
//     },
//     {
//       name: '1',
//       shape: 'circle',
//       coords: [350, 1020, 80],
//       title: 'Mercury',
//       otherInfo: 'testing this to see what kind of info can be placed',
//       onClick: 'Additional information About Mercury'
//     },
//     {
//       name: '2',
//       shape: 'circle',
//       coords: [528, 947, 80],
//       title: 'Venus',
//       otherInfo: 'testing this to see what kind of info can be placed'
//     },
//     {
//       name: '3',
//       shape: 'circle',
//       coords: [707, 873, 80],
//       title: 'Earth',
//       otherInfo: 'testing this to see what kind of info can be placed'
//     },
//     {
//       name: '4',
//       shape: 'circle',
//       coords: [885, 797, 80],
//       title: 'Mars',
//       otherInfo: 'testing this to see what kind of info can be placed'
//     },
//     {
//       name: '5',
//       shape: 'poly',
//       coords: [1050, 449, 1015, 702, 1021, 909, 1065, 1077, 1119, 779],
//       title: 'Astroid Belt & Others',
//       otherInfo: 'testing this to see what kind of info can be placed'
//     },
//     {
//       name: '6',
//       shape: 'circle',
//       coords: [1240, 645, 80],
//       title: 'Jupiter',
//       otherInfo: 'testing this to see what kind of info can be placed'
//     },
//     {
//       name: '7',
//       shape: 'circle',
//       coords: [1417, 570, 80],
//       title: 'Saturn',
//       otherInfo: 'testing this to see what kind of info can be placed'
//     },
//     {
//       name: '8',
//       shape: 'circle',
//       coords: [1594, 494, 80],
//       title: 'Uranus',
//       otherInfo: 'testing this to see what kind of info can be placed'
//     },
//     {
//       name: '9',
//       shape: 'circle',
//       coords: [1771, 420, 80],
//       title: 'Neptune',
//       otherInfo: 'testing this to see what kind of info can be placed'
//     },
//     {
//       name: '10',
//       shape: 'poly',
//       coords: [1885, 270, 1885, 517, 2032, 517, 2032, 270],
//       title: 'Kuiper Belt & Others',
//       otherInfo: 'testing this to see what kind of info can be placed'
//     },
//     {
//       name: '11',
//       shape: 'circle',
//       coords: [2125, 266, 60],
//       title: 'Planet X',
//       otherInfo: 'testing this to see what kind of info can be placed'
//     },
//     {
//       name: '12',
//       shape: 'poly',
//       coords: [2278, 124, 2157, 518, 2150, 756, 2278, 1132],
//       title: 'Oort Cloud',
//       otherInfo: 'testing this to see what kind of info can be placed'
//     }
//   ]
// };

const testWidth = window.screen.width; // 2560
const testHeight = window.screen.height; // 1440

const calcWitdh = window.screen.width * 0.9;
const calcHeight = window.screen.height * 0.9;

// const calcWitdh = window.screen.width - window.screen.width * 0.2;

class SpaceMap extends Component {
  state = {
    hoveredArea: null,
    hoverInfo:
      'Hover over a Solar System feature to see additional information, click on these features for even more interesting facts',
    title: '',
    X: '',
    Y: ''
  };

  componentDidMount() {
    this.loadBackground();
  }

  // componentWillMount() {
  //   window.addEventListener('click', this.getClickPosition, false);
  // }

  // getClickPosition = e => {
  //   this.setState({
  //     X: e.clientX,
  //     Y: e.clientY
  //   });
  // };

  clickArea(area) {
    this.setState({
      hoverInfo: area.onClick
    });
  }

  enterArea(area) {
    this.setState({
      hoveredArea: area,
      hoverInfo: area.otherInfo,
      title: area.title
    });
  }

  leaveArea(area) {
    this.setState({
      hoveredArea: null,
      testHover:
        'Hover over a Solar System feature to see additional information, click on these features for even more interesting facts',
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
            active={false}
            src={URL}
            map={MAP}
            width={calcWitdh}
            height={calcHeight}
            lineWidth={0}
            onMouseEnter={area => this.enterArea(area)}
            onMouseLeave={area => this.leaveArea(area)}
            onClick={area => this.clickArea(area)}
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
            <h3>Our Solar System | Interactive Map</h3>
            <hr />
            <h3>{this.state.title}</h3>
            {this.state.title ? <hr /> : ''}
            <h4>{this.state.hoverInfo}</h4>
          </div>
        </div>
      </>
    );
  }
}

export default SpaceMap;
