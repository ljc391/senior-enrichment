'use strict'
const api = require('express').Router()
const db = require('APP/db')

const Post = require('../db/models/post')
const Comment = require('../db/models/comment')


const bodyParser = require('body-parser')
api.use(bodyParser.urlencoded({ extended: false }));

api.get('/hello', function(req, res, next){
    res.json({success:true});
})

api.get('/posts', function(req, res, next){
    Post.findAll()
    .then(function(posts){
        res.json(posts);
    })
    .catch(next);

})
api.post('/posts', function(req, res, next){
    console.log("bodyss-----------",req.body);
    Post.create(req.body)
    .then(function(post){
        res.status(201).json({success:true});
    })
    .catch(next);
})
api.get('/posts/:postId', function(req, res, next){
    Post.findById(req.params.postId)
    .then(function(post){
        if(!post){
            res.status(404).send()
        }else{
             res.json(post)
        }

    })
    .catch(next);
})
api.put('/posts/:postId', function(req, res, next){
    Post.update({content:req.body.content},{where:{id:req.params.postId}})
    .then(function(post){
        if(!post){
            res.status(404).send();
        }else{
            res.status(200).send();
        }
    })
    .catch(next);
    // Post.findById(req.params.postId)
    // .then(function(post){
    //     if(!post){
    //         res.status(404).send()
    //     }else{
    //          res.json(post)
    //     }

    // })
    // .catch(next);
})
api.delete('/posts/:postId', function(req, res, next){
    console.log("delete------------");
    Post.destroy({where:{id:req.params.postId}} )
    .then(function(){
        Comment.destroy({where:{postId:req.params.postId}});
       //Comment.findAll({where:{postId:req.params.postId}});
           // res.status(204).send();
    })
    .then(function(){
        res.status(204).send();
    })
    .catch(next)
    })
api.get('/comments/:postId', function(req, res, next){
    Comment.findAll({where:{postId:req.params.postId}})
    .then(function(comments){
        if(!comments){
            res.status(404).send()
        }else{
             res.json(comments)
        }

    })
})

api.post('/comments/:postId', function(req, res, next){
    console.log("body====", req.body);
    console.log("id", req.params.postId);
    Comment.create({text:req.body.text, postId:req.params.postId})
    .then(function(comment){
        console.log("success=====", comment);
        res.status(201).json({success:true});
    })
    .catch(next);
})
module.exports = api