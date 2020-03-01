import axios from 'axios';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export default {
  getUsers: () => axios.get('/api/users'),

  getUser: _id => axios.get('/api/users/' + _id),

  saveUser: () => axios.post('/api/users'),

  getPosts: () => axios.get('/api/posts'),

  addPost: id => axios.post('/api/post/' + id),

  getDailyImage: () =>
    axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=6c8dTYwFcHRpLfZXRxCLC2F6obnFUWrGAJnvRc2u`
    ),

  getMarsWeather: () =>
    axios.get(
      'https://api.nasa.gov/insight_weather/?api_key=6c8dTYwFcHRpLfZXRxCLC2F6obnFUWrGAJnvRc2u&feedtype=json&ver=1.0'
    ),

  getMarsRoverPhotos: (date, camera) =>
    axios.get(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&camera=${camera}&api_key=6c8dTYwFcHRpLfZXRxCLC2F6obnFUWrGAJnvRc2u`
    ),

  getMarsPhotos: () =>
    axios
      .get('https://images-api.nasa.gov/search?q=martian', {
        cancelToken: source.token
      })
      .catch(function(thrown) {
        if (axios.isCancel(thrown)) {
          console.log('request canceled', thrown.message);
        } else {
          console.log('there is an error that needs to be handled');
        }
      })
};
