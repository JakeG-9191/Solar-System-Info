import React, { Component } from 'react';
import InteractiveMap from '../../json/interactiveMap';
import SolarSystem from '../../utils/spaceMap/0.jpg';
import Song from '../../utils/music/bensound-slowmotion.mp3';
import ImageMapper from 'react-image-mapper';
import { Link } from 'react-router-dom';
import './style.css';

const URL = SolarSystem;
const MAP = InteractiveMap;

const calcWitdh = window.screen.width * 0.9;
const calcHeight = window.screen.height * 0.9;

window.onload = function() {
  const myAudio = document.getElementById('myAudio');
  myAudio.volume = 0.1;
};

// const testWidth = window.screen.width; // 2560
// const testHeight = window.screen.height; // 1440
// const calcWitdh = window.screen.width - window.screen.width * 0.2;

class SpaceMap extends Component {
  state = {
    hoveredArea: null,
    hoverInfo:
      'Hover over a Solar System feature to see additional information, click on these features for even more interesting facts',
    clickInfo2: '',
    clickInfo3: '',
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
      hoverInfo: area.onClick.one,
      clickInfo2: area.onClick.two,
      clickInfo3: area.onClick.three
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
      hoverInfo:
        'Hover over a Solar System feature to see additional information, click on these features for even more interesting facts',
      title: '',
      clickInfo2: '',
      clickInfo3: ''
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
          {/* {this.state.hoveredArea && (
            <span
              className='tooltip'
              style={{ ...this.getTipPosition(this.state.hoveredArea) }}
            >
              {this.state.hoveredArea && this.state.hoveredArea.name}
            </span>
          )} */}
          <audio
            id='myAudio'
            controls
            src={Song}
            autoplay={this.state.hoverInfo}
            loop={true}
          />
          <div className='testing-overlay'>
            <h3>Our Solar System | Interactive Map</h3>
            <hr />
            <h3>{this.state.title}</h3>
            {this.state.title ? <hr /> : ''}
            <h4>{this.state.hoverInfo}</h4>
            <h4>{this.state.clickInfo2}</h4>
            <h4>{this.state.clickInfo3}</h4>
          </div>
        </div>
      </>
    );
  }
}

export default SpaceMap;
