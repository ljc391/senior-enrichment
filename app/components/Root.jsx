import React, { Component } from 'react';
import axios from 'axios';
export default class BonesJokes extends React.Component {
  constructor() {
    super()
    this.state = {
            post: '',
            comment:''
        };
    this.showComment = this.showComment.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {

  }
  updatePost(e){
    console.log(e.target.value);
     this.setState({ post: e.target.value });
  }
  updateComment(e){
    console.log(e.target.value);
     this.setState({ comment: e.target.value });
  }
  showComment(id){
    var url = `/api/comments/${id}`;
    //console.log(tmp);
    fetch(url)
    .then(res=> res.json())
    .then(function(comments){
      console.log("comments", `text${id}`);
      var p = document.getElementById(`text${id}`)
      p.innerHTML="";
      for(var i in comments){
        p.innerHTML +=  "<br />"+ comments[i].text;
      }

    })
    .catch(function (err) {
      console.error(err)
    });

  }
  postPost(){
    console.log("state", this.state.post);
    var body = {content:this.state.post, date:null};
    console.log("body", body);
    axios.post('/api/posts', {content:this.state.post, date:null})
    .then(function(res){
      if(res.status == 201){
        location.reload();
      }

    })
    .catch(function (err) {
      console.error(err)
    });

    // fetch("/api/posts", {
    //   method: "POST",
    //   body: "test"
    // })
    // .then(res=>res.json())
    // .then(function(res){
    //   console.log("res", res);
    // })

  }
  deleteli(id){
    console.log("delete");

    var url = `/api/posts/${id}`;
    console.log(url);
    axios.delete(url)
    .then(function(res){
      if(res.status == 204){
        location.reload();
      }

    })
    .catch(function (err) {
      console.error(err)
    });

  }
  postComment(id){
    console.log("click", this.state.comment);

    var url = `/api/comments/${id}`;
    axios.post(url, {text:this.state.comment})
    .then(function(res){
      if(res.status == 201){
        location.reload();
      }

    })
    .catch(function (err) {
      console.error(err)
    });


  }
  update(id){

    var url = `/api/posts/${id}`;
    console.log("click", url);
    axios.put(url, {content:this.state.comment})
    .then(function(res){
      if(res.status ==200){
        location.reload();
      }
    })
    .catch(function (err) {
      console.error(err)
    });

  }

  render() {
    //console.log("props", this.props.posts);
    //const {joke, answered} = this.state
    return (
      <div>
        <h1>Post</h1>
        <input type="text" onChange={this.updatePost} /><button onClick={() => this.postPost()} >submit post</button>
         {this.props.posts && this.props.posts.map((item, idx)=>(
            <li key={idx}  >
              <h1 id = {`li${idx}`} onClick={() => this.deleteli(item.id)}>  {item.content} </h1>
              <input type="text" onChange={this.updateComment} /><button onClick={() => this.postComment(item.id)} >Submit Comment</button>
              <button id = {item.id} onClick={() => this.showComment(item.id)}>show comment</button>
              <button id = {item.id} onClick={() => this.update(item.id)}>UPDATE</button>
              <p id={`text${item.id}`}></p>
            </li>
            )

            )
          }
      </div>
    )
  }
}
