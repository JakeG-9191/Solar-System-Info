import React, { Component } from 'react';
import API from '../../utils/API';
import { Link } from 'react-router-dom';
import './style.css';

class Mars extends Component {
  state = {
    randomImage: '',
    date: ''
  };

  render() {
    return (
      <div>
        <h1>Welcome To My Solar System!</h1>
        <h3>{this.state.date}</h3>
        <img src={this.state.randomImage}></img>
      </div>
    );
  }
}

export default Mars;
