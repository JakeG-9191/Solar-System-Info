import React, { Component } from 'react';
import API from '../../utils/API';
import { Link } from 'react-router-dom';
import './style.css';

class Login extends Component {
  state = {
    userLogin: '',
    userPassword: '',
    userSignup: '',
    userPassup: ''
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleLogin = e => {
    let id = '5e2a201b2d0d59ae282e0560';
    e.preventDefault();
    API.getUser(id).then(res => {
      console.log(res);
      this.props.history.push(`/${res.data._id}`);
    });
  };

  render() {
    return (
      <>
        <Link to='/'>
          <button className='btn btn-success'>Home</button>
        </Link>
        <div>
          <h1>Testing Login</h1>
          <div>
            <input
              type='text'
              className='form-control'
              id='loginName'
              placeholder='Enter Name'
              name='userLogin'
              value={this.state.userLogin}
              onChange={this.handleInputChange}
            />
            <button
              type='submit'
              className='btn btn-lg'
              onClick={this.handleLogin}
            >
              Submit
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Login;
