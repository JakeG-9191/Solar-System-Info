import axios from 'axios';

export default {
  getUsers: () => axios.get('/api/users'),

  getUser: _id => axios.get('/api/users/' + _id),

  saveUser: () => axios.post('/api/users'),

  getPosts: () => axios.get('/api/posts'),

  addPost: id => axios.post('/api/post/' + id),

  getDailyImage: () =>
    axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=6c8dTYwFcHRpLfZXRxCLC2F6obnFUWrGAJnvRc2u`
    )
};
