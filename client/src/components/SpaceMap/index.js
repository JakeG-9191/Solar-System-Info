import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InteractiveMap from '../../json/interactiveMap';
import SolarSystem from '../../utils/spaceMap/0.jpg';
import Song from '../../utils/music/bensound-slowmotion.mp3';
import ImageMapper from 'react-image-mapper';
import Modal from 'react-modal';
import './style.css';

const URL = SolarSystem;
const MAP = InteractiveMap;

const calcWitdh = window.screen.width * 0.9;
const calcHeight = window.screen.height * 0.9;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'none',
    width: '90vw'
  }
};

// const testWidth = window.screen.width; // 2560
// const testHeight = window.screen.height; // 1440
// const calcWitdh = window.screen.width - window.screen.width * 0.2;

class SpaceMap extends Component {
  state = {
    musicSelection: true,
    hoveredArea: null,
    hoverInfo:
      'Hover over a Solar System feature to see additional information, when you see Einstien, click on these features for even more interesting facts',
    clickInfo2: '',
    clickInfo3: '',
    img: '',
    title: '',
    X: '',
    Y: '',
    allowButton: null,
    animateReady: false
  };

  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(area) {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false, animateReady: true });
  }

  componentDidMount() {
    window.onload = () => {
      const myAudio = document.getElementById('myAudio');
      myAudio.volume = 0.05;
    };
    this.loadBackground();
    setTimeout(this.openModal, 500);
    setTimeout(this.buttonOpen, 3000);
  }

  componentWillMount() {
    window.addEventListener('click', this.getClickPosition, false);
    window.addEventListener('click', this.audioTest, false);
  }

  audioTest = () => {
    const myAudio = document.getElementById('myAudio');
    myAudio.volume = 0.05;
  };

  componentWillUnmount() {
    window.removeEventListener('click', this.audioTest);
  }

  buttonOpen = () => {
    this.setState({
      allowButton: true
    });
  };

  oneMoreAnimation = () => {
    this.setState({
      animateReady: false
    });
    setTimeout(this.closeModal, 500);
  };

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
      clickInfo3: area.onClick.three,
      img: area.img
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
        'Hover over a Solar System feature to see additional information, when you see Einstien, click on these features for even more interesting facts',
      title: '',
      clickInfo2: '',
      clickInfo3: '',
      img: ''
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
          {!this.state.musicSelection ? (
            <div>
              <audio
                id='myAudio'
                controls
                src={Song}
                autoPlay={true}
                loop={true}
              />
              <small id='royalty'>www.bensound.com</small>
              <button
                className='btn btn-warning'
                onClick={this.oneMoreAnimation}
                id='seeAnimation'
              >
                See Introduction Animation Again
              </button>
            </div>
          ) : (
            <div>
              <audio
                id='myAudio'
                controls
                src={Song}
                autoPlay={true}
                loop={true}
              />
              <button
                className='btn btn-warning'
                onClick={this.oneMoreAnimation}
                id='seeAnimation'
              >
                See Introduction Animation Again
              </button>
            </div>
          )}
          <div>
            <Modal
              ariaHideApp={false}
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              contentLabel='Example Modal'
              style={customStyles}
            >
              <div className='modal-wrap'>
                <div className='modal-sound'>
                  <h3>
                    Autoplay for music is enabled for this page, if you wish to
                    have the best experience we recommend leaving the autoplay
                    feature on while you explore the Interactive Map, if you
                    prefer though, you can shut off the sound via the controls
                    on the player in the top left-hand corner.
                  </h3>
                  <hr />
                </div>
                <div className='sound-on'>
                  {this.state.allowButton ? (
                    <button
                      className='btn btn-dark btn-lg modal-close'
                      onClick={this.closeModal}
                    >
                      Accept
                    </button>
                  ) : (
                    <button
                      disabled
                      className='btn btn-dark btn-lg modal-close'
                    >
                      Please Wait...
                    </button>
                  )}
                </div>
              </div>
            </Modal>
          </div>
          <div>
            {this.state.img ? (
              <img
                className='feature-image'
                alt='Solar System Feature'
                src={this.state.img}
              ></img>
            ) : (
              <>
                <h3 className='feature-image'>
                  Select A Solar System Feature...
                </h3>
              </>
            )}
          </div>
          <div className='testing-overlay'>
            <small>Source - ThePlanets.org | NASA</small>
            <h3>Our Solar System | Interactive Map</h3>
            <hr />
            <h3>{this.state.title}</h3>
            {this.state.title ? <hr /> : ''}
            <h5>{this.state.hoverInfo}</h5>
            {this.state.clickInfo2 ? <hr /> : ''}
            <h5>{this.state.clickInfo2}</h5>
            {this.state.clickInfo3 ? <hr /> : ''}
            <h5>{this.state.clickInfo3}</h5>
          </div>
          {this.state.animateReady ? (
            <div className='animated-intro'>
              <h1 id='fade-1'>
                Welcome to the Interactive Map of our solar system...
              </h1>
              <h1 id='fade-2'>
                Please use your cursor to visit the various components of our
                solar system...
              </h1>
              <h1 id='fade-3'>
                When your cursor changes, click on a planet or feature for more
                information...
              </h1>
            </div>
          ) : (
            ''
          )}
        </div>
      </>
    );
  }
}

export default SpaceMap;
