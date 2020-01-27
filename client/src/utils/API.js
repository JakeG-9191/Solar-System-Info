import axios from 'axios';

export default {
  getUsers: () => axios.get('/api/users'),

  getPosts: () => axios.get('/api/posts')
};
