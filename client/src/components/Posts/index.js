import React, { Component } from 'react';
import API from '../../utils/API';
import { Link } from 'react-router-dom';
import './style.css';

class Posts extends Component {
  state = {};

  componentDidMount() {
    API.getPosts().then(data => {
      console.log(data);
    });
  }

  render() {
    return (
      <div>
        <h1>Testing Posts</h1>
      </div>
    );
  }
}

export default Posts;
