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
  }

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
      <div>
        <Link to='/'>
          <button className='btn btn-success'>Home</button>
        </Link>
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
    );
  }
}

export default Posts;
