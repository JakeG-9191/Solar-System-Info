import axios from 'axios';

export default {
  getUsers: () => axios.get('/api/users'),

  getUser: id => axios.get('/api/users/' + id),

  getPosts: () => axios.get('/api/posts'),

  addPost: id => axios.post('/api/post/' + id),

  getDailyImage: () =>
    axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=6c8dTYwFcHRpLfZXRxCLC2F6obnFUWrGAJnvRc2u`
    )
};
