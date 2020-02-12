import React, { Component } from 'react';
import API from '../../utils/API';
import { Link } from 'react-router-dom';
import './style.css';

class Posts extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    this.grabAllPosts();
    this.loadBackground();
  }

  loadBackground = () => {
    let newBackground = Math.floor(Math.random() * 1);
    document.body.classList.remove(`backdrop${0}`);
    document.body.classList.remove(`backdrop${1}`);
    document.body.classList.remove(`backdrop${2}`);
    document.body.classList.remove(`backdrop${3}`);
    document.body.classList.remove(`mars${0}`);
    document.body.classList.remove(`game${0}`);
    document.body.classList.add(`post${newBackground}`);
  };

  grabAllPosts = () => {
    API.getPosts().then(res => {
      console.log(res);
      let myArray = [];
      for (let i = 0; i < res.data.length; i++) {
        let name = res.data[i].name;
        let text = res.data[i].text;
        let date = res.data[i].date;

        let obj = {
          name: name,
          text: text,
          date: date
        };

        myArray.push(obj);
      }

      this.setState({
        posts: myArray
      });
    });
  };

  newPost = id => {
    API.addPost(id).then(res => {});
  };

  render() {
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
            <button className='btn btn-info'>Forum Posts</button>
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
        <div>
          <h1>Testing Posts</h1>
          <button onClick={this.grabAllPosts}>Grab Posts</button>
          <h2>
            {this.state.posts.map(post => (
              <div id='all-posts'>
                <h4>Name: {post.name}</h4>
                <h4>Comment: {post.text}</h4>
                <h4>Date: {post.date}</h4>
              </div>
            ))}
          </h2>
        </div>
      </>
    );
  }
}

export default Posts;
