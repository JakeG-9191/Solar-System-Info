import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import MarsFacts from '../../json/marsFacts';
import API from '../../utils/API';
import './style.css';

// defines all options available for users to search when looking at cameras
const options = [
  { value: 'fhaz', label: 'Front Hazard Avoidance Camera' },
  { value: 'rhaz', label: 'Rear Hazard Avoidance Camera' },
  { value: 'mast', label: 'Mast Camera' },
  { value: 'chemcam', label: 'Chemestry Camera' },
  { value: 'mahli', label: 'Mars Hand Lens Imager' },
  { value: 'mardi', label: 'Mars Descent Imager' },
  { value: 'navcam', label: 'Navigation Camera' },
  { value: 'pancam', label: 'Panoramic Camera' },
  {
    value: 'minities',
    label: 'Minature Thermal Emission Spectrometer (Mini-TES)'
  }
];

// customizes style of dropdown to select cameras
const customStyles = {
  container: provided => ({
    ...provided,
    background: 'black',
    color: 'white'
  }),
  option: (provided, state) => ({
    ...provided,
    background: 'black',
    color: state.isSelected ? '#d36939' : 'white',
    border: '1px white solid',
    padding: 15
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: 200,
    color: 'white'
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 1 : 1;
    const transition = 'opacity 300ms';
    const color = 'color white';

    return { ...provided, opacity, transition, color };
  }
};

class Mars extends Component {
  state = {
    userDateInput: '',
    userCameraInput: null,
    userSearch: 'martian',
    marsUpdatedWeather: [],
    marsUpdatedSols: [],
    roverName: [],
    roverPhoto: [],
    photosDisplayed: false,
    date: new Date(),
    martianImage: '',
    martianDescription: '',
    martianMeta: '',
    martianCount: 0,
    martianFactTitle: '',
    martianFactBody: ''
  };

  loadNewMarsFact = () => {
    let newMarsFact = Math.floor(Math.random() * MarsFacts.length);
    this.setState({
      martianFactTitle: MarsFacts[newMarsFact].title,
      martianFactBody: MarsFacts[newMarsFact].body
    });
  };

  onChange = date => this.setState({ date });

  handleChange = userCameraInput => {
    this.setState(
      {
        userCameraInput
      },
      () => console.log(`option selected: `, this.state.userCameraInput)
    );
  };

  handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // Loads background, this is a function because it needs to clear previous backgrounds
  // Loads inital weather grab, which sets state of sols or martian days to grab weather with
  componentDidMount() {
    this.loadBackground();
    this.getUpdatedWeather();
    this.getNewMartianPhotos();
    this.loadNewMarsFact();
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

  // grabs available photos once user has selected a date and camera angle to search
  getRoverPhotos = e => {
    e.preventDefault();
    let camera = this.state.userCameraInput.value;
    let date = this.state.userDateInput;
    API.getMarsRoverPhotos(date, camera).then(data => {
      // console.log(data.data);
      // console.log(data.data.photos);
      // console.log(data.data.photos.length);
      // console.log(data.data.photos[0].camera.full_name);
      // console.log(data.data.photos[0].img_src);

      let results = data.data;
      let totalPhotos = results.photos.length;
      let cameraName = [];
      let imgSource = [];
      for (let i = 0; i < totalPhotos; i++) {
        let singleName = results.photos[i].camera.full_name;
        let singleImg = results.photos[i].img_src;
        cameraName.push(singleName);
        imgSource.push(singleImg);
      }
      if (cameraName.length > 0) {
        this.setState({
          roverName: cameraName,
          roverPhoto: imgSource,
          photosDisplayed: true
        });
      }
    });
  };

  getNewMartianPhotos = () => {
    let userSearch = this.state.userSearch;
    let loadedImage = '';
    let loadedInfo = '';
    let loadedMeta = '';
    let totalImage;

    API.getMarsPhotos(userSearch).then(data => {
      // console.log(data.data);
      // console.log(
      //   data.data.collection.items[this.state.martianCount].data[0].photographer
      // );
      // console.log(
      //   data.data.collection.items[this.state.martianCount].data[0].description
      // );
      // console.log(
      //   data.data.collection.items[this.state.martianCount].links[0].href
      // );

      totalImage = data.data.collection.items.length;
      loadedImage =
        data.data.collection.items[this.state.martianCount].links[0].href;
      loadedInfo =
        data.data.collection.items[this.state.martianCount].data[0].description;
      loadedMeta =
        data.data.collection.items[this.state.martianCount].data[0]
          .photographer;

      this.setState({
        martianImage: loadedImage,
        martianDescription: loadedInfo,
        martianMeta: loadedMeta,
        martianCount: this.state.martianCount + 1
      });

      if (this.state.martianCount < totalImage) {
        console.log(
          `shooting off, image count now ${this.state.martianCount} against ${totalImage}`
        );
        this.id = setTimeout(this.getNewMartianPhotos, 10000);
      }

      if (this.state.martianFactBody >= totalImage) {
        console.log('total value reached, restarting');
        this.setState({
          martianCount: 0
        });
        this.id = setTimeout(this.getNewMartianPhotos, 10000);
      }
    });
  };

  resetImageSearch = () => {
    this.setState({
      roverName: [],
      roverPhoto: [],
      photosDisplayed: false
    });
  };

  // new background loaded upon user reaching this component, old backgrounds must be cleared in order new one to appear properly, the work is completed here
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

  searchMartian = () => {
    clearTimeout(this.id);
    let userSearchNew = 'martian';
    this.setState({
      userSearch: userSearchNew,
      martianCount: 0
    });
    setTimeout(this.getNewMartianPhotos, 1000);
  };

  searchMars = () => {
    clearTimeout(this.id);
    let userSearchNew = 'mars';
    this.setState({
      userSearch: userSearchNew,
      martianCount: 0
    });
    setTimeout(this.getNewMartianPhotos, 1000);
  };

  searchMarsRover = () => {
    clearTimeout(this.id);
    let userSearchNew = 'mars-rover';
    this.setState({
      userSearch: userSearchNew,
      martianCount: 0
    });
    setTimeout(this.getNewMartianPhotos, 1000);
  };

  searchMarsMission = () => {
    clearTimeout(this.id);
    let userSearchNew = 'mars-mission';
    this.setState({
      userSearch: userSearchNew,
      martianCount: 0
    });
    setTimeout(this.getNewMartianPhotos, 1000);
  };

  componentWillUnmount() {
    clearTimeout(this.id);
  }

  render() {
    const { userCameraInput } = this.state;

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
          <h1 id='mars-intro'>The Mars Special</h1>
          <div className='container'>
            <div className='row'>
              <div className='martian-weather col-md-3'>
                <h4 className='weather-app'>7 Day Martian Forecast</h4>
                <hr />
                <h5 className='weather-app'>
                  {this.state.marsUpdatedSols[0]
                    ? `Sol ${this.state.marsUpdatedSols[0]} | Average Air Temp: ${this.state.marsUpdatedWeather[0]} F`
                    : 'No Data Available For This Sol'}
                </h5>
                <h5 className='weather-app'>
                  {this.state.marsUpdatedSols[1]
                    ? `Sol ${this.state.marsUpdatedSols[1]} | Average Air Temp: ${this.state.marsUpdatedWeather[1]} F`
                    : 'No Data Available For This Sol'}
                </h5>
                <h5 className='weather-app'>
                  {this.state.marsUpdatedSols[2]
                    ? `Sol ${this.state.marsUpdatedSols[2]} | Average Air Temp: ${this.state.marsUpdatedWeather[2]} F`
                    : 'No Data Available For This Sol'}
                </h5>
                <h5 className='weather-app'>
                  {this.state.marsUpdatedSols[3]
                    ? `Sol ${this.state.marsUpdatedSols[3]} | Average Air Temp: ${this.state.marsUpdatedWeather[3]} F`
                    : 'No Data Available For This Sol'}
                </h5>
                <h5 className='weather-app'>
                  {this.state.marsUpdatedSols[4]
                    ? `Sol ${this.state.marsUpdatedSols[4]} | Average Air Temp: ${this.state.marsUpdatedWeather[4]} F`
                    : 'No Data Available For This Sol'}
                </h5>
                <h5 className='weather-app'>
                  {this.state.marsUpdatedSols[5]
                    ? `Sol ${this.state.marsUpdatedSols[5]} | Average Air Temp: ${this.state.marsUpdatedWeather[5]} F`
                    : 'No Data Available For This Sol'}
                </h5>
                <h5 className='weather-app'>
                  {this.state.marsUpdatedSols[6]
                    ? `Sol ${this.state.marsUpdatedSols[6]} | Average Air Temp: ${this.state.marsUpdatedWeather[6]} F`
                    : 'No Data Available For This Sol'}
                </h5>
              </div>
              <div className='col-md-1'></div>
              <div className='col-md-3 jumbotron'>
                <div id='martian-static-facts'>
                  <h4>
                    Mars is one of the most explored bodies in our solar system,
                    and it's the only planet where we've sent rovers to roam the
                    alien landscape. NASA currently has three spacecraft in
                    orbit, one rover and one lander on the surface and another
                    rover under construction here on Earth. India and ESA also
                    have spacecraft in orbit above Mars.
                  </h4>
                  <a
                    rel='noopener noreferrer'
                    target='_blank'
                    href='https://solarsystem.nasa.gov/planets/mars/overview/'
                  >
                    Source - NASA
                  </a>
                </div>
                <hr />
                <div id='martian-nasa-facts'>
                  <h4>{this.state.martianFactTitle}</h4>
                  <hr className='hr-fix' />
                  <h5>{this.state.martianFactBody}</h5>
                  <a
                    rel='noopener noreferrer'
                    target='_blank'
                    href='https://solarsystem.nasa.gov/planets/mars/overview/'
                  >
                    Source - NASA
                  </a>
                  <hr className='hr-fix' />
                  <h4>Additional Links</h4>
                  <a
                    rel='noopener noreferrer'
                    target='_blank'
                    href='https://www.nasa.gov/specials/moon2mars/'
                  >
                    NASA - Moon To Mars
                  </a>
                  <hr className='hr-fix' />
                  <a
                    rel='noopener noreferrer'
                    target='_blank'
                    href='https://www.nasa.gov/mission_pages/mars/main/index.html'
                  >
                    NASA - Mars Today
                  </a>
                  <hr className='hr-fix' />
                  <a
                    rel='noopener noreferrer'
                    target='_blank'
                    href='https://www.nasa.gov/mission_pages/mars/overview/index.html'
                  >
                    NASA - Mars Program Overview
                  </a>
                </div>
              </div>
              <div className='col-md-1'></div>
              <div className='col-md-4'>
                <div className='search-buttons'>
                  <h5>Click Buttons Below To Search New Images</h5>
                  <button
                    className='btn btn-primary'
                    onClick={this.searchMartian}
                  >
                    "Martian"
                  </button>
                  <button className='btn btn-primary' onClick={this.searchMars}>
                    "Mars"
                  </button>
                  <button
                    className='btn btn-primary'
                    onClick={this.searchMarsRover}
                  >
                    "Mars Rover"
                  </button>
                  <button
                    className='btn btn-primary'
                    onClick={this.searchMarsMission}
                  >
                    "Mars Mission"
                  </button>
                </div>
                <h4 id='photo-meta'>{this.state.martianMeta}</h4>
                <img
                  alt={this.state.martianDescription}
                  id='rolling-photos'
                  src={this.state.martianImage}
                ></img>
                <h4>{this.state.martianDescription}</h4>
              </div>
              <div className='col-md-12 photo-top'>
                <h2>
                  {!this.state.photosDisplayed
                    ? 'Search For Amazing Martian Rover Photos Below'
                    : ''}
                </h2>
              </div>
              {!this.state.photosDisplayed ? (
                <div className='col-md-12 picture-bucket'>
                  <form>
                    <label>
                      Input Earth Date:
                      <input
                        type='date'
                        name='userDateInput'
                        value={this.state.userDateInput}
                        onChange={this.handleInputChange}
                      />
                    </label>
                  </form>
                  <div className='select-custom'>
                    <Select
                      styles={customStyles}
                      menuColor='red'
                      options={options}
                      onChange={this.handleChange}
                      value={userCameraInput}
                      placeholder='Select an option'
                    />
                    <button
                      className='photo-buttons'
                      disabled={
                        !(
                          this.state.userDateInput && this.state.userCameraInput
                        )
                      }
                      onClick={this.getRoverPhotos}
                    >
                      Get Mars Photos
                    </button>
                  </div>
                </div>
              ) : (
                ''
              )}
              <div className='col-md-12'>
                <h3 id='no-image-found'>
                  {this.state.roverName[0]
                    ? `Camera Name: ${this.state.roverName[0]}`
                    : 'Select A Camera And Date In Order To See Photos'}
                </h3>
                <h3 id='no-image-found2'>
                  {this.state.roverName[0]
                    ? ''
                    : 'If No Images Load, Please Try Another Date/Camera Combo'}
                </h3>
                <img
                  alt=''
                  className='rover-image'
                  src={this.state.roverPhoto[0] ? this.state.roverPhoto[0] : ''}
                />
                <img
                  alt=''
                  className='rover-image'
                  src={this.state.roverPhoto[1] ? this.state.roverPhoto[1] : ''}
                />
                <img
                  alt=''
                  className='rover-image'
                  src={this.state.roverPhoto[2] ? this.state.roverPhoto[2] : ''}
                />
                <img
                  alt=''
                  className='rover-image'
                  src={this.state.roverPhoto[3] ? this.state.roverPhoto[3] : ''}
                />
              </div>
              <div className='col-md-12'>
                <img
                  alt=''
                  className='rover-image'
                  src={this.state.roverPhoto[4] ? this.state.roverPhoto[4] : ''}
                />
                <img
                  alt=''
                  className='rover-image'
                  src={this.state.roverPhoto[5] ? this.state.roverPhoto[5] : ''}
                />
                <img
                  alt=''
                  className='rover-image'
                  src={this.state.roverPhoto[6] ? this.state.roverPhoto[6] : ''}
                />
                <img
                  alt=''
                  className='rover-image'
                  src={this.state.roverPhoto[7] ? this.state.roverPhoto[7] : ''}
                />
              </div>
              <div className='col-md-12'>
                {!this.state.photosDisplayed ? (
                  ''
                ) : (
                  <button
                    className='photo-buttons'
                    onClick={this.resetImageSearch}
                  >
                    Look At More Images
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Mars;
