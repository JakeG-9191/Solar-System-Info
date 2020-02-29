import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
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
    color: state.isSelected ? 'red' : 'white',
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
    marsUpdatedWeather: [],
    marsUpdatedSols: [],
    roverName: [],
    roverPhoto: []
  };

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
    API.getMarsPhotos(date, camera).then(data => {
      // console.log(data.data);
      // console.log(data.data.photos);
      // console.log(data.data.photos.length);
      // console.log(data.data.photos[0].camera.name);
      // console.log(data.data.photos[0].img_src);

      let results = data.data;
      let totalPhotos = results.photos.length;
      let cameraName = [];
      let imgSource = [];
      for (let i = 0; i < totalPhotos; i++) {
        let singleName = results.photos[i].camera.name;
        let singleImg = results.photos[i].img_src;
        cameraName.push(singleName);
        imgSource.push(singleImg);
      }
      if (cameraName.length > 0) {
        this.setState({
          roverName: cameraName,
          roverPhoto: imgSource
        });
      }
      console.log(this.state.roverName);
      console.log(this.state.roverPhoto);
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
          <h1>The Mars Special</h1>
          <div className='container'>
            <div className='row'>
              <div className='martian-weather col-md-6'>
                <h5>
                  {this.state.marsUpdatedSols[0]
                    ? `Sol ${this.state.marsUpdatedSols[0]} | Average Air Temp: ${this.state.marsUpdatedWeather[0]} F`
                    : 'No Data Available For This Sol'}
                </h5>
                <h5>
                  {this.state.marsUpdatedSols[1]
                    ? `Sol ${this.state.marsUpdatedSols[1]} | Average Air Temp: ${this.state.marsUpdatedWeather[1]} F`
                    : 'No Data Available For This Sol'}
                </h5>
                <h5>
                  {this.state.marsUpdatedSols[2]
                    ? `Sol ${this.state.marsUpdatedSols[2]} | Average Air Temp: ${this.state.marsUpdatedWeather[2]} F`
                    : 'No Data Available For This Sol'}
                </h5>
                <h5>
                  {this.state.marsUpdatedSols[3]
                    ? `Sol ${this.state.marsUpdatedSols[3]} | Average Air Temp: ${this.state.marsUpdatedWeather[3]} F`
                    : 'No Data Available For This Sol'}
                </h5>
                <h5>
                  {this.state.marsUpdatedSols[4]
                    ? `Sol ${this.state.marsUpdatedSols[4]} | Average Air Temp: ${this.state.marsUpdatedWeather[4]} F`
                    : 'No Data Available For This Sol'}
                </h5>
                <h5>
                  {this.state.marsUpdatedSols[5]
                    ? `Sol ${this.state.marsUpdatedSols[5]} | Average Air Temp: ${this.state.marsUpdatedWeather[5]} F`
                    : 'No Data Available For This Sol'}
                </h5>
                <h5>
                  {this.state.marsUpdatedSols[6]
                    ? `Sol ${this.state.marsUpdatedSols[6]} | Average Air Temp: ${this.state.marsUpdatedWeather[6]} F`
                    : 'No Data Available For This Sol'}
                </h5>
              </div>
              <div className='col-md-6'>
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
                    disabled={
                      !(this.state.userDateInput && this.state.userCameraInput)
                    }
                    onClick={this.getRoverPhotos}
                  >
                    Get Mars Photos
                  </button>
                </div>
              </div>
              <div className='col-md-12'>
                <h3>{this.state.roverName[0]}</h3>
                <img className='rover-image' src={this.state.roverPhoto[0]} />
                <img className='rover-image' src={this.state.roverPhoto[1]} />
                <img className='rover-image' src={this.state.roverPhoto[2]} />
                <img className='rover-image' src={this.state.roverPhoto[3]} />
              </div>
              <div className='col-md-12'>
                <img className='rover-image' src={this.state.roverPhoto[4]} />
                <img className='rover-image' src={this.state.roverPhoto[5]} />
                <img className='rover-image' src={this.state.roverPhoto[6]} />
                <img className='rover-image' src={this.state.roverPhoto[7]} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Mars;
